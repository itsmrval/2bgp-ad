import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/mission.css';

const TITLE = "Objectif de la mission";
const CONTENT = "Après avoir retrouvé le vaisseau d'Arkann, une étrange inquiétude s'empare de vous : Arkann n'est nulle part en vue. Aurait-il délibérément abandonné son vaisseau pour vous mettre à l'épreuve ? Pourtant, ce dernier est hermétiquement verrouillé...";
const POINTS = 150;
const SUCCESS_RATE = "100%";
const DEFAULT_FLAG = "FLAG-EXAMPLE";

const MissionCard = ({
    title = TITLE,
    content = CONTENT,
    points = POINTS,
    successRate = SUCCESS_RATE,
    correctFlag = DEFAULT_FLAG 
}) => {
    const navigate = useNavigate();
    
    const [flag, setFlag] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    const handleBackClick = () => {
        navigate('/');
    };

    const handleFlagSubmit = (e) => {
        e.preventDefault();
        
        if (flag.trim()) {
            if (flag === correctFlag) { 
                setFeedbackMessage('Félicitations! Flag correct.');
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/'); 
                }, 3000);
            } else {
                setFeedbackMessage('Flag incorrect. Essayez à nouveau.');
                setIsSuccess(false);
            }
            
            setShowFeedback(true);
            
            setTimeout(() => {
                setShowFeedback(false);
            }, 3000);
        }
    };

    return (
        <div className="mission-app-body">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">{title}</h5>
                </div>
                
                <div className="card-stats">
                    <div className="card-stat">
                        <strong>Points</strong>
                        <span>{points}</span>
                    </div>
                    <div className="card-stat">
                        <strong>Taux de succès</strong>
                        <span>{successRate}</span>
                    </div>
                </div>
                
                <div className="card-body">
                    <p className="card-text">{content}</p>
                    
                    <div className="flag-section">
                        <h6>Soumettre un flag</h6>
                        <form onSubmit={handleFlagSubmit} className="flag-form">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="flag-input"
                                    value={flag}
                                    onChange={(e) => setFlag(e.target.value)}
                                    placeholder="Entrez le flag ici"
                                    required
                                />
                                <button type="submit" className="submit-btn">Valider</button>
                            </div>
                        </form>
                        
                        {showFeedback && (
                            <div className={`feedback-message ${isSuccess ? 'success' : 'error'}`}>
                                {feedbackMessage}
                            </div>
                        )}
                    </div>
                </div>
                
                <button className="back-button" onClick={handleBackClick}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default MissionCard;
