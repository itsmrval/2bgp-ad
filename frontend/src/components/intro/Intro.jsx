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
    const audioRef = useRef(null); // Référence pour l'audio
    const navigate = useNavigate();

    useEffect(() => {
        // Initialiser l'audio
        audioRef.current = new Audio(Introsound);
        audioRef.current.play().catch(err => console.error("Error playing audio:", err));

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

        // Cleanup function
        return () => {
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
            // Arrêter l'audio lors du démontage du composant
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        };
    }, []);

    useEffect(() => {
        const titles = {
            1: "Danny Ocean planifie le braquage de trois casinos à Las Vegas.",
            2: "Il recrute une équipe de onze experts, dont vous, spécialiste en cybersécurité.",
            3: "Votre mission: cartographier et exploiter les failles des réseaux depuis votre chambre.",
            4: "Pendant le braquage, vous neutraliserez les systèmes de sécurité en temps réel.",
            5: "Présenté par BONNEAU Corentin, PUCCETTI Valentin, BERSIN Mathieu et GOYA LONGO François.",
            6: "OCEAN'S ELEVEN"
        };

        const colors = {
            1: { number: '#ffcc5c' },
            2: { number: '#515e7b' },
            3: { number: '#3063ff' },
            4: { number: '#fe54ff' },
            5: { number: '#ff6b54' },
            6: { number: '#ff0000' }
        };

        setTitle(titles[currentNumber]);
        setNumberColor(colors[currentNumber]?.number || '#ff0000');
        setTitleColor(colors[currentNumber]?.title || '#ffffff');

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
            if (currentNumber < 6) {
                const nextTimer = setTimeout(() => {
                    setCurrentNumber(prev => prev + 1);
                }, 500);
                return () => clearTimeout(nextTimer);
            } else {
                const redirectTimer = setTimeout(() => {
                    if (audioRef.current) {
                        audioRef.current.pause();
                        audioRef.current.currentTime = 0;
                    }
                    navigate('/');
                }, 4000);

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