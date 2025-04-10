import React from 'react';
import '../assets/styles/playingcard.css';

const PlayingCard = ({ value, suit }) => {
    // Déterminer le symbole en fonction de la couleur
    let symbol;
    switch (suit) {
        case 'hearts': symbol = '♥'; break;
        case 'diamonds': symbol = '♦'; break;
        case 'clubs': symbol = '♣'; break;
        case 'spades': symbol = '♠'; break;
        default: symbol = '♠';
    }

    // Déterminer la couleur : rouge pour les cœurs et les carreaux, noir pour les trèfles et les piques
    const cardColor = ['hearts', 'diamonds'].includes(suit) ? 'red' : 'black';

    return (
        <div className="playing-card-full">
            <div className="corner top-left">
                <div className="value">{value}</div>
                <div className="suit" style={{ color: cardColor }}>{symbol}</div>
            </div>

            <div className="center-symbol" style={{ color: cardColor }}>{symbol}</div>

            <div className="corner bottom-right">
                <div className="value">{value}</div>
                <div className="suit" style={{ color: cardColor }}>{symbol}</div>
            </div>
        </div>
    );
};

export default PlayingCard;
