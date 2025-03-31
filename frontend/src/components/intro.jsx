import React, { useEffect } from 'react';

const Intro = () => {
    useEffect(() => {
        // We'll keep this JavaScript for additional control if needed
        const title = document.querySelector('.title');
        const number = document.querySelector('.number');
        
        // Reset animations when component mounts
        title.style.opacity = 1; // We'll control visibility with CSS animation instead
        number.style.opacity = 1;
    }, []);

    return (
        <div className="container">
            <style>{`
                /* Mise en page de base */
                html, body {
                    margin: 0;
                    padding: 0;
                    width: 100%;
                    height: 100%;
                    background: #000; /* Fond noir */
                    font-family: sans-serif;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                /* Conteneur principal */
                .container {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: row;
                }

                /* Titre "OCEAN'S ELEVEN" en points blancs */
                .title {
                    position: relative;
                    z-index: 2;
                    font-size: 4em;
                    text-align: center;
                    margin: 0;
                    color: transparent;
                    background-image: repeating-radial-gradient(
                        #ffffff 0 2px,
                        transparent 2px 6px
                    );
                    background-clip: text;
                    -webkit-background-clip: text;
                    background-size: 8px 8px;
                    animation: titleAppear 3s forwards;
                    opacity: 0;
                    clip-path: inset(0 100% 0 0); /* Start with text clipped */
                }

                /* Le grand chiffre "11" en points rouges */
                .number {
                    position: relative;
                    z-index: 1;
                    font-size: 25em;
                    color: transparent;
                    background-image: repeating-radial-gradient(
                        #ff0000 0 3px,
                        transparent 3px 10px
                    );
                    background-clip: text;
                    -webkit-background-clip: text;
                    background-size: 13px 13px;
                    margin: 0;
                    line-height: 0.9;
                    margin-left: -20px;
                    animation: numberAppear 3s forwards;
                    animation-delay: 1.5s;
                    opacity: 0;
                    clip-path: inset(0 100% 0 0); /* Start with number clipped */
                }

                /* Animation for title appearance */
                @keyframes titleAppear {
                    0% {
                        background-size: 4px 4px;
                        opacity: 0;
                        clip-path: inset(0 100% 0 0);
                    }
                    30% {
                        opacity: 0.5;
                        background-size: 6px 6px;
                        clip-path: inset(0 75% 0 0);
                    }
                    65% {
                        opacity: 0.8;
                        background-size: 7px 7px;
                        clip-path: inset(0 25% 0 0);
                    }
                    100% {
                        background-size: 8px 8px;
                        opacity: 1;
                        clip-path: inset(0 0 0 0); /* Fully visible */
                    }
                }
                
                /* Animation for number appearance */
                @keyframes numberAppear {
                    0% {
                        background-size: 6px 6px;
                        opacity: 0;
                        clip-path: inset(0 100% 0 0);
                    }
                    30% {
                        opacity: 0.5;
                        background-size: 9px 9px;
                        clip-path: inset(0 75% 0 0);
                    }
                    65% {
                        opacity: 0.8;
                        background-size: 11px 11px;
                        clip-path: inset(0 25% 0 0);
                    }
                    100% {
                        background-size: 13px 13px;
                        opacity: 1;
                        clip-path: inset(0 0 0 0); /* Fully visible */
                    }
                }
            `}</style>
            <h1 className="title">OCEAN'S ELEVEN</h1>
            <h1 className="number">11</h1>
        </div>
    );
};

export default Intro;
