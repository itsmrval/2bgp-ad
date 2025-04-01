import React, { useEffect, useState } from 'react';
import Introsound from './assets/intro.mp3';

const Intro = ({ onComplete = () => {} }) => {
    const [currentNumber, setCurrentNumber] = useState(1);
    const [title, setTitle] = useState('');
    const [animationComplete, setAnimationComplete] = useState(false);
    const [key, setKey] = useState(0);
    const [direction, setDirection] = useState(0);
    const [numberColor, setNumberColor] = useState('#ff0000');
    const [titleColor, setTitleColor] = useState('#ffffff');
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const audio = new Audio(Introsound);
        audio.play().catch(err => console.error("Error playing audio:", err));
    }, []);

    useEffect(() => {
        const titles = {
            1: "OCEAN'S ONE",
            2: "OCEAN'S TWO",
            3: "2BGP TEAMS",
            4: "MATHIEU BERSIN",
            5: "CORENTIN BONNEAU",
            6: "FRANCOIS GOYALONGO",
            7: "VALENTIN PUCCETTI",
            8: "OCEAN'S EIGHT",
            9: "OCEAN'S NINE",
            10: "OCEAN'S TEN",
            11: "OCEAN'S ELEVEN"
        };

        const colors = {
            1: { number: '#ffcc5c'  },
            2: { number: '#515e7b'},
            3: { number: '#3063ff'},
            4: { number: '#fe54ff' },
            5: { number: '#ff6b54' },
            7: { number: '#8f00ff' },
            6: { number: '#ffdd5f' },
            8: { number: '#ff1493' },
            9: { number: '#00ffff' },
            10: { number: '#ffd700' },
            11: { number: '#ff0000' }
        };

        setTitle(titles[currentNumber]);
        setNumberColor(colors[currentNumber].number);
        setTitleColor(colors[currentNumber].title || '#ffffff');

        setDirection(currentNumber % 4);
        setKey(prevKey => prevKey + 1);
    }, [currentNumber]);

    useEffect(() => {
        setAnimationComplete(false);

        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 2500);

        return () => clearTimeout(timer);
    }, [currentNumber]);

    useEffect(() => {
        if (animationComplete) {
            if (currentNumber < 11) {
                const nextTimer = setTimeout(() => {
                    setCurrentNumber(prev => prev + 1);
                }, 500);
                return () => clearTimeout(nextTimer);
            } else {
                const buttonTimer = setTimeout(() => {
                    setShowButton(true);
                }, 1000);
                
                onComplete();
                
                return () => clearTimeout(buttonTimer);
            }
        }
    }, [animationComplete, currentNumber, onComplete]);

    const getAnimationClass = () => {
        switch(direction) {
            case 0: return "left-to-right";
            case 1: return "right-to-left";
            case 2: return "top-to-bottom";
            case 3: return "bottom-to-top";
            default: return "left-to-right";
        }
    };

    const animationClass = getAnimationClass();

    const handleNavigation = () => {
        window.location.href = '/login';
    };

    return (
        <div className="container">
            <style>{`
                html, body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    background: #000;
                    font-family: sans-serif;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .title {
                    position: relative;
                    z-index: 2;
                    font-size: 4em;
                    text-align: right;
                    margin: 0;
                    margin-right: 20px;
                    color: transparent;
                    background-image: repeating-radial-gradient(
                        ${titleColor} 0 2px,
                        transparent 2px 6px
                    );
                    background-clip: text;
                    -webkit-background-clip: text;
                    background-size: 8px 8px;
                    animation: titleAppear-${animationClass} 1.5s forwards;
                    opacity: 0;
                }

                .number {
                    position: relative;
                    z-index: 1;
                    font-size: 25em;
                    color: transparent;
                    background-image: repeating-radial-gradient(
                        ${numberColor} 0 3px,
                        transparent 3px 10px
                    );
                    background-clip: text;
                    -webkit-background-clip: text;
                    background-size: 13px 13px;
                    margin: 0;
                    line-height: 0.9;
                    animation: numberAppear-${animationClass} 1.5s forwards;
                    animation-delay: 0.8s;
                    opacity: 0;
                }

                @keyframes titleAppear-left-to-right {
                    0% {
                        background-size: 4px 4px;
                        opacity: 0;
                        clip-path: inset(0 100% 0 0);
                    }
                    100% {
                        background-size: 8px 8px;
                        opacity: 1;
                        clip-path: inset(0 0 0 0);
                    }
                }

                @keyframes numberAppear-left-to-right {
                    0% {
                        background-size: 6px 6px;
                        opacity: 0;
                        clip-path: inset(0 100% 0 0);
                    }
                    100% {
                        background-size: 13px 13px;
                        opacity: 1;
                        clip-path: inset(0 0 0 0);
                    }
                }

                @keyframes titleAppear-right-to-left {
                    0% {
                        background-size: 4px 4px;
                        opacity: 0;
                        clip-path: inset(0 0 0 100%);
                    }
                    100% {
                        background-size: 8px 8px;
                        opacity: 1;
                        clip-path: inset(0 0 0 0);
                    }
                }

                @keyframes numberAppear-right-to-left {
                    0% {
                        background-size: 6px 6px;
                        opacity: 0;
                        clip-path: inset(0 0 0 100%);
                    }
                    100% {
                        background-size: 13px 13px;
                        opacity: 1;
                        clip-path: inset(0 0 0 0);
                    }
                }

                @keyframes titleAppear-top-to-bottom {
                    0% {
                        background-size: 4px 4px;
                        opacity: 0;
                        clip-path: inset(100% 0 0 0);
                    }
                    100% {
                        background-size: 8px 8px;
                        opacity: 1;
                        clip-path: inset(0 0 0 0);
                    }
                }

                @keyframes numberAppear-top-to-bottom {
                    0% {
                        background-size: 6px 6px;
                        opacity: 0;
                        clip-path: inset(100% 0 0 0);
                    }
                    100% {
                        background-size: 13px 13px;
                        opacity: 1;
                        clip-path: inset(0 0 0 0);
                    }
                }

                @keyframes titleAppear-bottom-to-top {
                    0% {
                        background-size: 4px 4px;
                        opacity: 0;
                        clip-path: inset(0 0 100% 0);
                    }
                    100% {
                        background-size: 8px 8px;
                        opacity: 1;
                        clip-path: inset(0 0 0 0);
                    }
                }

                @keyframes numberAppear-bottom-to-top {
                    0% {
                        background-size: 6px 6px;
                        opacity: 0;
                        clip-path: inset(0 0 100% 0);
                    }
                    100% {
                        background-size: 13px 13px;
                        opacity: 1;
                        clip-path: inset(0 0 0 0);
                    }
                }

                .skip-button {
                    position: absolute;
                    bottom: 40px;
                    right: 60%;
                    padding: 12px 30px;
                    border: none;
                    border-radius: 30px;
                    font-size: 18px;
                    font-weight: bold;
                    cursor: pointer;
                    z-index: 100;
                    color: white;
                    background: linear-gradient(135deg, #ff0844 0%, #ff3366 50%, #ff0844 100%);
                    box-shadow: 0 4px 15px rgba(255, 8, 68, 0.4);
                    transition: all 0.3s ease;
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeInButton 0.8s forwards;
                }

                @keyframes fadeInButton {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .skip-button:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 7px 20px rgba(255, 8, 68, 0.6);
                    background: linear-gradient(135deg, #ff3366 0%, #ff0844 50%, #ff3366 100%);
                }
                
                .skip-button:active {
                    transform: translateY(1px);
                    box-shadow: 0 3px 10px rgba(255, 8, 68, 0.4);
                }

                .button-icon {
                    font-size: 20px;
                    display: inline-block;
                    margin-right: 5px;
                }

                .button-text {
                    position: relative;
                    z-index: 2;
                }

                @keyframes sparkle {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 1; }
                }

                .sparkle {
                    position: absolute;
                    background: rgba(255, 255, 255, 0.7);
                    border-radius: 50%;
                    animation: sparkle 1.5s infinite;
                }
            `}</style>
            <h1 className={`title ${animationClass}`} key={`title-${key}`}>{title}</h1>
            <h1 className={`number ${animationClass}`} key={`number-${key}`}>{currentNumber}</h1>
            
            {showButton && (
                <button className="skip-button" onClick={handleNavigation}>
                    <span className="button-icon">💎</span>
                    <span className="button-text">Enter the Heist</span>
                </button>
            )}
        </div>
    );
};

export default Intro;