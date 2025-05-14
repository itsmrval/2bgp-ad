import React from 'react';
import Test from '../Test.jsx';
import GameTable from '../GameTable.jsx';
import BackgroundImage from '../../assets/img/tissu.jpg'; // Import the background image

const Main = () => {
    const mainStyle = {
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
        alignItems: 'center',
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };

    const cardStyle = {
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        transition: '0.3s',
        borderRadius: '5px'
    };

    return (
        <div style={mainStyle}>
            <div style={cardStyle}>
                <Test />
            </div>
        </div>
    );
};

export default Main;
