import React, { useState, useEffect } from 'react';

const CardGame = () => {
  // Données des cartes
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
  const suitSymbols = {
    'hearts': '♥',
    'diamonds': '♦',
    'clubs': '♣',
    'spades': '♠'
  };

  // États
  const [deck, setDeck] = useState([]);
  const [hand, setHand] = useState([]);
  const [playedCards, setPlayedCards] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Créer le jeu de cartes complet
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
    }
    return newDeck;
  };

  // Mélanger le jeu de cartes
  const shuffleDeck = () => {
    const newDeck = [...deck];
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }
    
    // Mettre à jour la main avec les 13 premières cartes
    setDeck(newDeck);
    setHand(newDeck.slice(0, 13));
  };

  // Réinitialiser le jeu
  const resetGame = () => {
    const newDeck = createDeck();
    setDeck(newDeck);
    
    // Mélanger et préparer les 13 premières cartes
    const shuffledDeck = [...newDeck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }
    
    setDeck(shuffledDeck);
    setHand(shuffledDeck.slice(0, 13));
    setPlayedCards([]);
    
    // Créer les emplacements disponibles
    const slots = Array.from({ length: 13 }, (_, i) => i);
    setAvailableSlots(slots);
  };

  // Jouer une carte
  const playCard = (card) => {
    if (availableSlots.length === 0) return;

    // Prendre le premier emplacement disponible
    const slotIndex = availableSlots[0];
    const newAvailableSlots = availableSlots.slice(1);
    setAvailableSlots(newAvailableSlots);

    // Marquer la carte comme jouée
    const updatedHand = hand.map(c => 
      c.id === card.id ? { ...c, played: true, slotIndex: slotIndex } : c
    );
    setHand(updatedHand);

    // Ajouter aux cartes jouées
    setPlayedCards([...playedCards, { ...card, slotIndex }]);
  };

  // Initialiser le jeu au chargement
  useEffect(() => {
    resetGame();
  }, []);

  // Calculer l'espacement des cartes dans la main
  const calculateHandCardStyle = (index, card) => {
    const cardSpacing = 55; // pixels entre les cartes
    const totalCards = hand.filter(c => !c.played).length;
    const handWidth = Math.min((totalCards - 1) * cardSpacing + 100, 700);
    const startX = -handWidth / 2 + 50;
    
    // Calculer l'index réel en ignorant les cartes déjà jouées
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

  // Calculer le style pour une carte jouée
  const getPlayedCardStyle = (card) => {
    // On trouve la position de l'emplacement dans la grille
    const row = Math.floor(card.slotIndex / 5);
    const col = card.slotIndex % 5;
    const topPos = 10 + row * 150;
    const leftPos = 10 + col * 110;

    return {
      position: 'absolute',
      top: `${topPos}px`,
      left: `${leftPos}px`,
      transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      zIndex: 50 + card.slotIndex,
      cursor: 'default'
    };
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative w-full max-w-4xl h-96 bg-green-800 rounded-lg shadow-2xl p-4 overflow-hidden">
        {/* Contrôles */}
        <div className="absolute top-4 left-4 flex space-x-4">
          <button 
            onClick={shuffleDeck}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Mélanger
          </button>
          <button 
            onClick={resetGame}
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Réinitialiser
          </button>
        </div>
        
        {/* Zone de jeu - où les cartes sont placées */}
        <div className="absolute top-20 w-full px-4 grid grid-cols-5 gap-2">
          {/* Emplacements pour les cartes */}
          {Array.from({ length: 13 }).map((_, index) => (
            <div 
              key={`slot-${index}`} 
              className="w-24 h-36 border border-dashed border-white/20 rounded-lg"
            />
          ))}
          
          {/* Cartes jouées */}
          {playedCards.map((card) => (
            <Card 
              key={card.id}
              card={card}
              suitSymbol={suitSymbols[card.suit]}
              style={getPlayedCardStyle(card)}
              played
            />
          ))}
        </div>
        
        {/* Main du joueur */}
        <div className="absolute bottom-4 w-full h-36">
          <div className="relative h-full flex justify-center items-center">
            {hand.map((card, index) => (
              <Card 
                key={card.id}
                card={card}
                suitSymbol={suitSymbols[card.suit]}
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

// Composant Carte
const Card = ({ card, suitSymbol, style, onClick, hoverEffect, played }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Déterminer la couleur selon la couleur
  const isRed = card.suit === 'hearts' || card.suit === 'diamonds';
  const cardColor = isRed ? 'text-red-600' : 'text-black';
  
  // Style de base pour toutes les cartes
  const baseStyle = {
    width: '100px',
    height: '140px',
    position: 'absolute',
    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
    ...style
  };
  
  // Appliquer l'effet de survol si activé
  const hoverStyles = hoverEffect && isHovered ? {
    transform: `${style.transform.replace('translateX', 'translateX')} translateY(-20px)`,
    zIndex: 20,
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
  } : {};
  
  // Combiner tous les styles
  const combinedStyle = { ...baseStyle, ...hoverStyles };

  return (
    <div
      className={`bg-white rounded-lg shadow-md ${cardColor} flex flex-col justify-between p-1`}
      style={combinedStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Partie supérieure */}
      <div className="flex flex-col items-start">
        <div className="font-bold text-lg">{card.value}</div>
        <div className="text-2xl leading-none">{suitSymbol}</div>
      </div>
      
      {/* Symbole central pour les figures */}
      {['A', 'J', 'Q', 'K'].includes(card.value) && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
          {suitSymbol}
        </div>
      )}
      
      {/* Partie inférieure (inversée) */}
      <div className="flex flex-col items-end transform rotate-180">
        <div className="font-bold text-lg">{card.value}</div>
        <div className="text-2xl leading-none">{suitSymbol}</div>
      </div>
    </div>
  );
};

export default CardGame;