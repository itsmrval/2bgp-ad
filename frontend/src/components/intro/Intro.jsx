import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Introsound from '../../assets/music/intro.mp3';
import '../../assets/styles/intro.css';

const Intro = () => {
    const [currentNumber, setCurrentNumber] = useState(1);
    const [title, setTitle] = useState('');
    const [animationComplete, setAnimationComplete] = useState(false);
    const [key, setKey] = useState(0);
    const [direction, setDirection] = useState(0);
    const [numberColor, setNumberColor] = useState('#ff0000');
    const [titleColor, setTitleColor] = useState('#ffffff');

    const titleRef = useRef(null);
    const numberRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const audio = new Audio(Introsound);
        audio.play().catch(err => console.error("Error playing audio:", err));

        // Add page-specific styles when component mounts
        const style = document.createElement('style');
        style.innerHTML = `
            .intro-page-container {
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
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
            }
        `;
        document.head.appendChild(style);

        // Cleanup function to remove styles when component unmounts
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Rest of your component code remains the same
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
            1: { number: '#ffcc5c' },
            2: { number: '#515e7b' },
            3: { number: '#3063ff' },
            4: { number: '#fe54ff' },
            5: { number: '#ff6b54' },
            6: { number: '#ffdd5f' },
            7: { number: '#8f00ff' },
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
        // Apply dynamic background styles
        if (titleRef.current) {
            titleRef.current.style.backgroundImage = `repeating-radial-gradient(
                ${titleColor} 0 2px,
                transparent 2px 6px
            )`;
        }

        if (numberRef.current) {
            numberRef.current.style.backgroundImage = `repeating-radial-gradient(
                ${numberColor} 0 3px,
                transparent 3px 10px
            )`;
        }
    }, [titleColor, numberColor]);

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
                const redirectTimer = setTimeout(() => {
                    navigate('/login');
                }, 4000); // Redirection après 4 secondes

                return () => clearTimeout(redirectTimer);
            }
        }
    }, [animationComplete, currentNumber, navigate]);

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

    return (
        <div className="intro-page-container">
            <div className="container">
                <h1
                    className={`title ${animationClass}`}
                    key={`title-${key}`}
                    ref={titleRef}
                >
                    {title}
                </h1>
                <h1
                    className={`number ${animationClass}`}
                    key={`number-${key}`}
                    ref={numberRef}
                >
                    {currentNumber}
                </h1>
            </div>
        </div>
    );
};

export default Intro;