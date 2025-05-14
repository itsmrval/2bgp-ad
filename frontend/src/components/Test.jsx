import React, { useState, useEffect } from 'react';
import PlayingCard from './PlayingCard';
import { useNavigate } from 'react-router-dom';
import OceansLogo from '../assets/img/OCEAN’S 11.png'; // Import the logo
import BackgroundImage from '../assets/img/tissu.jpg'; // Import the background image

const BlackjackTable = ({ playedCards }) => {
    return (  <div className="flex flex-wrap gap-4 p-4 bg-green-800 rounded-lg relative w-full h-[500px]"
               style={{
                 backgroundImage: `url(${BackgroundImage})`,
                 backgroundSize: 'cover',
                 backgroundPosition: 'center'
               }}>
    {/* Ocean's 11 Logo */}
    <img
      src={OceansLogo}
      alt="Ocean's 11"
      className="absolute z-10"
      style={{ 
        maxWidth: '1000px',
        maxHeight: '800px',
        position: 'absolute', 
        top: '80px', 
        left: '50%', 
        transform: 'translateX(-50%)'
      }}
    /> 
            {[...Array(13)].map((_, index) => {
                // Use percentage values for responsive positioning
                let leftPos, topPos;

                // Assign positions based on the index using percentages
                switch (index) {
                    case 0: leftPos = '5%'; topPos = '20%'; break;  // Ace leftmost
                    case 1: leftPos = '13%'; topPos = '35%'; break;
                    case 2: leftPos = '21%'; topPos = '50%'; break;
                    case 3: leftPos = '29%'; topPos = '60%'; break;
                    case 4: leftPos = '37%'; topPos = '60%'; break;
                    case 5: leftPos = '45%'; topPos = '60%'; break;
                    case 6: leftPos = '50%'; topPos = '60%'; break;  // Center card
                    case 7: leftPos = '55%'; topPos = '60%'; break;
                    case 8: leftPos = '63%'; topPos = '60%'; break;
                    case 9: leftPos = '71%'; topPos = '60%'; break;
                    case 10: leftPos = '79%'; topPos = '50%'; break;
                    case 11: leftPos = '87%'; topPos = '35%'; break;
                    case 12: leftPos = '95%'; topPos = '20%'; break;  // King rightmost
                    default: leftPos = '0%'; topPos = '0%'; break;
                }

                const card = playedCards.find(c => c.slotIndex === index);

                return (
                    <div
                        key={`card-${index}`}
                        style={{
                            width: '90px',
                            height: '126px',
                            position: 'absolute',
                            background: 'transparent',
                            border: '2px solid rgb(255, 0, 0)',
                            borderRadius: 6,
                            left: leftPos,
                            top: topPos,
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {card && <PlayingCard value={card.value} suit={card.suit} />}
                    </div>
                );
            })}
        </div>
    );
};


const CardWrapper = ({ card, style, onClick, hoverEffect }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Base style for all cards
    const baseStyle = {
        width: '90px',
        height: '126px',
        position: 'absolute',
        transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        overflow: 'visible',
        transform: `${style.transform}`,
        left: '50%', // Center point reference
        bottom: '30px',
        marginLeft: '-45px', // Half of width to center properly
        ...style
    };

    // Apply hover effect if enabled
    const hoverStyles = hoverEffect && isHovered ? {
        transform: `${style.transform} translateY(-50px)`,
        zIndex: 100,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
    } : {};

    const combinedStyle = { ...baseStyle, ...hoverStyles };

    return (
        <div
            style={combinedStyle}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="bg-white rounded-lg shadow-md"
        >
            <PlayingCard
                value={card.value}
                suit={card.suit}
                isHovered={isHovered}
            />
        </div>
    );
};

const Test = () => {
    const navigate = useNavigate();
    
    // Card data
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    // State
    const [deck, setDeck] = useState([]);
    const [hand, setHand] = useState([]);
    const [playedCards, setPlayedCards] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);

    // Create complete deck in ascending order and add jokers
    const createDeck = () => {
        const newDeck = [];

        for (let suit of suits) {
            for (let value of values) {
                newDeck.push({
                    suit,
                    value,
                    id: `${value}-${suit}`,
                    played: false,
                    slotIndex: null
                });
            }
            newDeck.push({
                suit,
                value: 'Joker',
                id: `Joker-${suit}`,
                played: false,
                slotIndex: null
            });
        }

        return newDeck;
    };

    const initializeGame = () => {
        const newDeck = createDeck();
        setDeck(newDeck);
        setHand(newDeck.slice(0, 13));
        setAvailableSlots(Array.from({ length: 13 }, (_, i) => i));
    };

    const playCard = (card) => {
        if (availableSlots.length === 0) return;

        let slotIndex;
        if (card.value === 'A') slotIndex = 0;
        else if (card.value === 'J') slotIndex = 10;
        else if (card.value === 'Q') slotIndex = 11;
        else if (card.value === 'K') slotIndex = 12;
        else if (card.value === 'Joker') {
            slotIndex = availableSlots[0];
        } else {
            slotIndex = parseInt(card.value) - 1;
        }

        if (!availableSlots.includes(slotIndex)) {
            return;
        }

        const newAvailableSlots = availableSlots.filter(slot => slot !== slotIndex);
        setAvailableSlots(newAvailableSlots);

        const updatedHand = hand.map(c =>
            c.id === card.id ? { ...c, played: true, slotIndex: slotIndex } : c
        );
        setHand(updatedHand);

        setPlayedCards([...playedCards, { ...card, slotIndex }]);
        
        navigate('/mission')
    };

    useEffect(() => {
        initializeGame();
    }, []);
    
    const calculateHandCardStyle = (index, card) => {
        const cardSpacing = 45; // Reduced spacing for a tighter hand
        const totalCards = hand.filter(c => !c.played).length;
        const handWidth = Math.min((totalCards - 1) * cardSpacing + 90, 600);
        const startX = -handWidth / 2 + 45;

        const realIndex = hand.filter((c, i) => !c.played && i < index).length;
        const posX = startX + (realIndex * cardSpacing);
        const isPlayed = card.played;

        return {
            transform: isPlayed ? 'scale(0)' : `translateX(${posX}px)`,
            zIndex: isPlayed ? 0 : index + 1,
            opacity: isPlayed ? 0 : 1,
            pointerEvents: isPlayed ? 'none' : 'auto'
        };
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="relative w-full max-w-3xl bg-gray-800 rounded-lg shadow-2xl p-4 overflow-hidden">
                {/* Blackjack Table at the top */}
                <div className="mb-4">
                    <BlackjackTable playedCards={playedCards} />
                </div>

                {/* Player's hand */}
                <div className="absolute bottom-0 w-full h-32">
                    <div className="relative h-full flex justify-center items-center">
                        {hand.map((card, index) => (
                            <CardWrapper
                                key={card.id}
                                card={card}
                                style={calculateHandCardStyle(index, card)}
                                onClick={() => !card.played && playCard(card)}
                                hoverEffect
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Test;
