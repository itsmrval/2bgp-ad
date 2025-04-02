import React from 'react';

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
        boxSizing: 'border-box'
    };

    return (
        <div style={mainStyle}>
            {/* Content will go here */}
        </div>
    );
};

export default Main;