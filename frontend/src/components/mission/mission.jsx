import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/mission.css';

// Default values
const TITLE = "Objectif de la mission";
const CONTENT = "Après avoir retrouvé le vaisseau d'Arkann, une étrange inquiétude s'empare de vous : Arkann n'est nulle part en vue. Aurait-il délibérément abandonné son vaisseau pour vous mettre à l'épreuve ? Pourtant, ce dernier est hermétiquement verrouillé...";
const POINTS = 150;
const SUCCESS_RATE = "100%";
const DEFAULT_FLAG = "FLAG-EXAMPLE"; // Default flag value for validation

const MissionCard = ({
    title = TITLE,
    content = CONTENT,
    points = POINTS,
    successRate = SUCCESS_RATE,
    correctFlag = DEFAULT_FLAG // Added default flag as a prop
}) => {
    // Navigation hook
    const navigate = useNavigate();
    
    // States pour le flag
    const [flag, setFlag] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);

    // Fonction pour revenir à la page d'accueil
    const handleBackClick = () => {
        navigate('/');
    };

    // Fonction pour vérifier le flag soumis
    const handleFlagSubmit = (e) => {
        e.preventDefault();
        
        // Vérification simple du flag
        if (flag.trim()) { // trim() pour enlever les espaces
            // Vérification du flag
            // Utilisation de la prop correctFlag pour la validation
            if (flag === correctFlag) { // Now using the prop value for validation
                setFeedbackMessage('Félicitations! Flag correct.');
                setIsSuccess(true);
                setTimeout(() => {
                    navigate('/'); // Redirect to accueil page
                }, 3000); // Redirect to accueil page
            } else {
                setFeedbackMessage('Flag incorrect. Essayez à nouveau.');
                setIsSuccess(false);
            }
            
            // Affichage du feedback
            setShowFeedback(true);
            
            // Cacher le feedback après 3 secondes
            setTimeout(() => {
                setShowFeedback(false);
            }, 3000);
        }
    };

    return (
        <div className="mission-app-body">
            <div className="card">
                {/* En-tête de la carte */}
                <div className="card-header">
                    <h5 className="card-title">{title}</h5>
                </div>
                
                {/* Statistiques */}
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
                
                {/* Contenu principal */}
                <div className="card-body">
                    <p className="card-text">{content}</p>
                    
                    {/* Section de soumission de flag */}
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
                        
                        {/* Message de feedback */}
                        {showFeedback && (
                            <div className={`feedback-message ${isSuccess ? 'success' : 'error'}`}>
                                {feedbackMessage}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Bouton de retour (remplaçant la flèche) */}
                <button className="back-button" onClick={handleBackClick}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default MissionCard;
