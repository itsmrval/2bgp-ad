import React, { useState, useEffect } from 'react';
export default function Footer() {
    const [isConnected, setIsConnected] = useState(true);
    
    return (
        <div
            style={{
                width: '100%',
                padding: '30px 20px',
                backgroundColor: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000   ,
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
                            color: '#FFFFFF',
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
                                {isConnected ? 'Connected' : 'Disconnected'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
