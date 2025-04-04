import React, { useState, useEffect } from 'react';

export default function Footer() {
    const [isConnected, setIsConnected] = useState(true);
    const [connectionTime, setConnectionTime] = useState(0);
    
    // Update connection time every second
    useEffect(() => {
        const timer = setInterval(() => {
            if (isConnected) {
                setConnectionTime(prevTime => prevTime + 1);
            }
        }, 1000);
        
        return () => clearInterval(timer);
    }, [isConnected]);
    
    // Format time as mm:ss
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    return (
        <div
            style={{
                width: '100%',
                padding: '30px 20px',
                background: '#FFFFFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1,
            }}
        >
            <div
                style={{
                    width: '98%',
                    maxWidth: '1200px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '15px',
                        alignItems: 'center',
                    }}
                >
                    <span
                        style={{
                            color: '#000000',
                            fontSize: '12px',
                            fontFamily: "'Helvetica-Inserat', Helvetica, Arial, sans-serif",
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        © 2025 2BGP. All rights reserved.
                    </span>
                </div>
                
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    position: 'relative',
                    height: '40px'
                }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{ 
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <img
                                src={require('../../assets/logo/dot.svg').default}
                                alt="Connection Status"
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    filter: isConnected ? 'none' : 'grayscale(100%)',
                                    position: 'absolute',
                                    top: '-4px',
                                    left: '-24px'
                                }}
                            />
                            <span style={{
                                fontSize: '12px',
                                fontFamily: "'Helvetica-Inserat', Helvetica, Arial, sans-serif",
                                color: isConnected ? '#00AA00' : '#AA0000',
                                whiteSpace: 'nowrap',
                                marginLeft: '0px'
                            }}>
                                {isConnected ? 'Connected' : 'Not Connected'}
                            </span>
                        </div>
                        <span style={{
                            fontSize: '12px',
                            fontFamily: "'Helvetica-Inserat', Helvetica, Arial, sans-serif",
                            position: 'absolute',
                            top: '16px',
                            left: '-24px',
                            textAlign: 'center'
                        }}>
                            {formatTime(connectionTime)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}