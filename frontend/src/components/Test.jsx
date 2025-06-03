import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlayingCard from './PlayingCard';
import BackgroundImage from '../assets/img/tissu.jpg';
import { getLevels, getNextUserNextLevel } from '../api/calls';
import LoaderGif from '../assets/logo/logo.gif';
import { useAuth } from '../api/auth/useAuth';

const positions = [
  { left: '7%', top: '20%', rotation: -8 },
  { left: '17%', top: '25%', rotation: -8 },
  { left: '17%', top: '45%', rotation: -8 },
  { left: '28%', top: '46%', rotation: -8 },
  { left: '35%', top: '65%', rotation: -6 },
  { left: '45%', top: '65%', rotation: -2 },
  { left: '55%', top: '65%', rotation: 2 },
  { left: '65%', top: '65%', rotation: 6 },
  { left: '72%', top: '46%', rotation: 8 },
  { left: '83%', top: '45%', rotation: 8 },
  { left: '83%', top: '25%', rotation: 8 },
  { left: '93%', top: '20%', rotation: 8 }
];

const BlackjackTable = ({ playedCards, completedLevels, nextLevelHid, hand }) => {
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const [visibleCards, setVisibleCards] = useState(new Set());

  useEffect(() => {
    completedLevels.forEach((card, index) => {
      setTimeout(() => {
        setVisibleCards(prev => new Set([...prev, card.id]));
      }, index * 200);

      setTimeout(() => {
        setAnimatedCards(prev => new Set([...prev, card.id]));
      }, index * 200 + 50);
    });
  }, [completedLevels]);

  return (
    <>
      <style>
        {`
          @keyframes slideIntoSlot {
            0% {
              transform: rotateY(180deg) scale(0.8);
              opacity: 0;
            }
            50% {
              transform: rotateY(90deg) scale(1.1);
              opacity: 0.7;
            }
            75% {
              transform: rotateY(0deg) scale(1);
              opacity: 1;
            }
            100% {
              transform: rotateY(0deg) scale(1);
              opacity: 1;
            }
          }
          @keyframes glowPulse {
            0%, 100% {
              box-shadow: 0 0 10px rgba(255, 215, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.6);
            }
            50% {
              box-shadow: 0 0 20px rgba(255, 215, 0, 1), 0 0 30px rgba(255, 215, 0, 0.8);
            }
          }
          .next-level-highlight {
            animation: glowPulse 2s infinite;
            border: 3px solid gold !important;
            z-index: 20 !important;
          }
        `}
      </style>
      <div
        className="relative w-full h-[500px] bg-green-800 rounded-lg p-4"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {positions.map((position, index) => {
          const playedCard = playedCards.find(c => c.slotIndex === index);
          const completedCard = completedLevels.find(c => c.slotIndex === index);
          const card = playedCard || completedCard;
          const valueMap = { A: 0, J: 10, Q: 11, K: 12 };
          const allCards = [...hand, ...playedCards, ...completedLevels];
          const nextLevelCard = allCards.find(c => c.value == nextLevelHid);
          const expectedSlotForNextLevel = nextLevelCard ? (valueMap[nextLevelCard.value] ?? parseInt(nextLevelCard.value) - 1) : -1;
          const isNextLevel = index === expectedSlotForNextLevel;

          const isAnimated = card && animatedCards.has(card.id);
          const isVisible = card && (visibleCards.has(card.id) || playedCard);
          const rotation = position.rotation;

          return (
            <div
              key={`card-${index}`}
              className={isNextLevel ? 'next-level-highlight' : ''}
              style={{
                width: '90px',
                height: '126px',
                position: 'absolute',
                border: isNextLevel ? '3px solid gold' : '2px solid rgb(255, 255, 255)',
                borderRadius: '6px',
                left: position.left,
                top: position.top,
                transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                zIndex: isNextLevel ? 20 : (card ? 10 : 1),
              }}
            >
              {card && isVisible && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    animation: isAnimated && completedCard ? 'slideIntoSlot 0.6s ease-out forwards' : 'none',
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center',
                  }}
                >
                  <PlayingCard
                    value={card.value}
                    suit={card.suit}
                    hoverAnimated={true}
                    active={isNextLevel}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

const CardWrapper = ({ card, style, onClick, animationDelay, showAnimation, isDisabled, isNextLevel }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => setShouldShow(true), animationDelay);
      return () => clearTimeout(timer);
    }
  }, [showAnimation, animationDelay]);

  useEffect(() => {
    if (shouldShow) {
      const timer = setTimeout(() => setHasAnimated(true), 150);
      return () => clearTimeout(timer);
    }
  }, [shouldShow]);

  if (!shouldShow && !card.played) return null;

  const baseStyle = {
    width: '90px',
    height: '126px',
    position: 'absolute',
    transform: style.transform,
    left: '50%',
    bottom: '30px',
    marginLeft: '-45px',
    transition: isHovered ? 'all 0.2s ease' : 'none',
    filter: isDisabled ? 'grayscale(100%)' : 'none',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    pointerEvents: isDisabled ? 'none' : 'auto',
    borderRadius: '6px',
    ...style
  };

  const bounceAnimation = shouldShow && !hasAnimated && !card.played
    ? {
        animation: `cardBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards`,
        opacity: 0,
        transform: `${style.transform} translateY(100px)`
      }
    : {};

  const hoverStyles = isHovered && hasAnimated && !isDisabled
    ? {
        transform: `${style.transform} translateY(-40px)`,
        zIndex: 100,
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.25)'
      }
    : {};

  const nextLevelStyles = isNextLevel && hasAnimated
    ? {
        transform: `${style.transform} translateY(-20px)`,
        zIndex: 99,
        boxShadow: '0 0 15px rgba(255, 215, 0, 0.8), 0 4px 15px rgba(0, 0, 0, 0.3)',
        border: '2px solid gold',
        borderRadius: '6px'
      }
    : {};

  return (
    <>
      <style>
        {`
          @keyframes cardBounce {
            0% { opacity: 0; transform: ${style.transform} translateY(100px) scale(0.9); }
            60% { opacity: 1; transform: ${style.transform} translateY(-15px) scale(1.05); }
            80% { transform: ${style.transform} translateY(5px) scale(0.98); }
            100% { opacity: 1; transform: ${style.transform} translateY(0) scale(1); }
          }
        `}
      </style>
      <div
        style={{ ...baseStyle, ...bounceAnimation, ...hoverStyles, ...nextLevelStyles }}
        onClick={!isDisabled ? onClick : undefined}
        onMouseEnter={() => !isDisabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <PlayingCard
          value={card.value}
          suit={card.suit}
          hoverAnimated={isHovered && !isDisabled}
          active={isNextLevel}
        />
      </div>
    </>
  );
};

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [levels, setLevels] = useState([]);
  const [hand, setHand] = useState([]);
  const [playedCards, setPlayedCards] = useState([]);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCardAnimation, setShowCardAnimation] = useState(false);
  const [nextLevelHid, setNextLevelHid] = useState(null);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const nextLevel = await getNextUserNextLevel(user.id);
        const data = await getLevels();

        setLevels(data);
        setNextLevelHid(nextLevel);
        initializeGame(data, nextLevel);

        setTimeout(() => {
          setShowCardAnimation(true);
          setLoading(false);
        }, 100);
      } catch (err) {
        console.error("Error fetching levels:", err);
      }
    };
    fetchLevels();
  }, []);

  const initializeGame = (data, nextLevel) => {
    const valueMap = { A: 0, J: 10, Q: 11, K: 12 };

    const completedCards = [];
    const handCards = [];

    data.forEach(level => {
      const card = {
        suit: 'hearts',
        value: level.hid || 'A',
        id: level._id,
        played: false,
        slotIndex: null,
        levelId: level.id
      };

      const isCompleted = isLevelCompleted(level.hid, nextLevel);

      if (isCompleted) {
        const slotIndex = valueMap[card.value] ?? parseInt(card.value) - 1;
        completedCards.push({ ...card, slotIndex, played: true });
      } else {
        handCards.push(card);
      }
    });

    setCompletedLevels(completedCards);
    setHand(handCards);

    const occupiedSlots = completedCards.map(card => card.slotIndex);
    const allSlots = [...Array(13).keys()];
    setAvailableSlots(allSlots.filter(slot => !occupiedSlots.includes(slot)));
  };

  const isLevelCompleted = (levelHid, nextLevelHid) => {
    return levelHid < nextLevelHid;
  };

  const playCard = (card) => {
    if (availableSlots.length === 0) return;

    const valueMap = { A: 0, J: 10, Q: 11, K: 12 };
    const slotIndex = valueMap[card.value] ?? parseInt(card.value) - 1;

    if (!availableSlots.includes(slotIndex)) return;

    setAvailableSlots(prev => prev.filter(slot => slot !== slotIndex));
    setHand(prev =>
      prev.map(c => c.id === card.id ? { ...c, played: true, slotIndex } : c)
    );
    setPlayedCards(prev => [...prev, { ...card, slotIndex }]);
    navigate(`/mission/${card.id}`);
  };

  const calculateHandCardStyle = (index, card) => {
    const cardSpacing = 45;
    const unplayedCards = hand.filter(c => !c.played);
    const realIndex = unplayedCards.indexOf(card);
    const handWidth = Math.min((unplayedCards.length - 1) * cardSpacing + 90, 600);
    const startX = -handWidth / 2 + 45;
    const posX = startX + realIndex * cardSpacing;

    return {
      transform: card.played ? 'scale(0)' : `translateX(${posX}px)`,
      zIndex: card.played ? 0 : index + 1,
      opacity: card.played ? 0 : 1,
      pointerEvents: card.played ? 'none' : 'auto'
    };
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative w-full max-w-3xl bg-gray-800 rounded-lg shadow-2xl p-4 overflow-hidden">
        <div className="mb-4">
          <BlackjackTable
            playedCards={playedCards}
            completedLevels={completedLevels}
            nextLevelHid={nextLevelHid}
            hand={hand}
          />
        </div>
        <div className="absolute bottom-0 w-full h-32">
          <div className="relative h-full flex justify-center items-center">
            {loading ? (
              <div style={{ width: '90px', height: '126px', position: 'absolute', left: '50%', bottom: 0, marginLeft: '-45px' }}>
                <img src={LoaderGif} alt="Loading..." style={{ width: '120%' }} />
              </div>
            ) : (
              hand.map((card, index) => {
                const unplayedIndex = hand.filter((c, i) => !c.played && i <= index).length - 1;
                const isNextLevel = card.value == nextLevelHid;
                const isDisabled = nextLevelHid && card.value != nextLevelHid;

                return (
                  <CardWrapper
                    key={card.id}
                    card={card}
                    style={calculateHandCardStyle(index, card)}
                    onClick={() => !card.played && !isDisabled && playCard(card)}
                    animationDelay={unplayedIndex * 120}
                    showAnimation={showCardAnimation}
                    isDisabled={isDisabled}
                    isNextLevel={isNextLevel}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
