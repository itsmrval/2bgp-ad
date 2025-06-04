import '../assets/styles/playingcard.css';
import React, { useState, useEffect } from 'react';

const PlayingCard = ({ value, hoverAnimated = false, active = false }) => {
  const [symbol, setSymbol] = useState('');

  useEffect(() => {
    const redSymbols = ['♥', '♦'];
    const blackSymbols = ['♣', '♠'];

    // Choose symbol based on the active prop
    const symbols = active ? redSymbols : [...redSymbols, ...blackSymbols];
    const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];

    setSymbol(randomSymbol);
  }, [active]);

  const cardColor = active || ['♥', '♦'].includes(symbol) ? 'red' : 'black';
  const cardClassName = hoverAnimated ? 'playing-card-full card-hover-animated' : 'playing-card-full';

  return (
    <div className={cardClassName}>
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
