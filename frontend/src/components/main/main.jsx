import React from 'react';
import PlayingCard from '../PlayingCard';

const Main = () => {
    const mainStyle = {
        backgroundColor: 'white',
        width: '100%',
        minHeight: '100vh',
        padding: '20px',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    };

    const cardStyle = {
        margin: '10px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        transition: '0.3s',
        borderRadius: '5px'
    };

    return (
        <div style={mainStyle}>
            <div style={cardStyle}>
                <PlayingCard value="A" suit="hearts" />
            </div>
        </div>
    );
};

export default Main;