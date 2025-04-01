import React from 'react';
import '../assets/styles/playingcard.css';

const PlayingCard = ({ value, suit, color }) => {
    // Determine the symbol based on the suit
    let symbol;
    switch (suit) {
        case 'hearts': symbol = '♥'; break;
        case 'diamonds': symbol = '♦'; break;
        case 'clubs': symbol = '♣'; break;
        case 'spades': symbol = '♠'; break;
        default: symbol = '♠';
    }
    
    // Determine color: red for hearts and diamonds, black for clubs and spades
    const cardColor = color || (['hearts', 'diamonds'].includes(suit) ? 'red' : 'black');

    return (
        <div className="grid-item">
            <div className="top-left">
                {value}<br/>
                <div style={{ color: cardColor }}>{symbol}</div>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div className="heart">
                <div style={{ color: cardColor }}>{symbol}</div>
            </div>
            <div></div>
            <div></div>
            <div></div>
            <div className="bottom-right">
                {value}<br/>
                <div style={{ color: cardColor }}>{symbol}</div>
            </div>
        </div>
    );
};

export default PlayingCard;
