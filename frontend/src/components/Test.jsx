import React, { useState, useEffect } from 'react';
import PlayingCard from './PlayingCard';


const CardWrapper = ({ card, style, onClick, hoverEffect }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Style de base pour toutes les cartes
    const baseStyle = {
        width: '100px',
        height: '140px',
        position: 'absolute',
        transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        overflow: 'visible', // Ensure card content isn't clipped
        ...style
    };

    // Appliquer l'effet de survol si activé
    const hoverStyles = hoverEffect && isHovered ? {
        transform: `${style.transform} translateY(-20px)`,
        zIndex: 100, // Higher z-index to ensure it appears above other cards
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)'
    } : {};

    // Combiner tous les styles
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
    // Données des cartes
    const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
    const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    // États
    const [deck, setDeck] = useState([]);
    const [hand, setHand] = useState([]);
    const [playedCards, setPlayedCards] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);

    // Créer le jeu de cartes complet en ordre croissant et ajouter des jokers
    const createDeck = () => {
        const newDeck = [];

        // Ajouter les cartes normales en ordre croissant par couleur
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
            // Ajouter un joker pour chaque couleur
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

    // Initialiser le jeu
    const initializeGame = () => {
        const newDeck = createDeck();

        // Prendre les 13 premières cartes pour la main
        setDeck(newDeck);
        setHand(newDeck.slice(0, 13));

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
        initializeGame();
    }, []);

// Increase the cardSpacing value in the calculateHandCardStyle function
const calculateHandCardStyle = (index, card) => {
    const cardSpacing = 70; // Changed from 55 to 70 for more space between cards
    const totalCards = hand.filter(c => !c.played).length;
    const handWidth = Math.min((totalCards - 1) * cardSpacing + 100, 800); // Increased max width from 700 to 800
    const startX = -handWidth / 2 + 50;

    // Reste de la fonction reste inchangé
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

// Also increase spacing in the played cards area
const getPlayedCardStyle = (card) => {
    const row = Math.floor(card.slotIndex / 5);
    const col = card.slotIndex % 5;
    const topPos = 10 + row * 160; // Changed from 150 to 160
    const leftPos = 10 + col * 130; // Changed from 110 to 130

    // Rest of the function remains unchanged
    return {
        position: 'absolute',
        top: `${topPos}px`,
        left: `${leftPos}px`,
        transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        zIndex: 50 + card.slotIndex,
        cursor: 'default',
        width: '100px',
        height: '140px'
    };
};


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="relative w-full max-w-4xl h-96 bg-green-800 rounded-lg shadow-2xl p-4 overflow-hidden">
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
                        <CardWrapper
                            key={card.id}
                            card={card}
                            style={getPlayedCardStyle(card)}
                            played
                        />
                    ))}
                </div>

                {/* Main du joueur */}
                <div className="absolute bottom-4 w-full h-36">
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
