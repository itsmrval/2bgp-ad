import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLevels, awardUserPoints } from '../../api/calls';
import '../../assets/styles/mission.css';
import loadingGif from '../../assets/logo/logo.gif';

const MissionCard = () => {
    const navigate = useNavigate();
    const { levelId } = useParams();
    const [level, setLevel] = useState(null);
    const [flag, setFlag] = useState('');
    const [feedbackMessage, setFeedbackMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLevel = async () => {
            try {
                if (!levelId) {
                    console.log('Level ID is missing');
                    return;
                }

                const levels = await getLevels();
                const currentLevel = levels.find(l => l._id === levelId);

                if (!currentLevel) {
                    console.error('Level not found:', levelId);
                    navigate('/');
                    return;
                }

                setLevel(currentLevel);
                setTimeout(() => {
                    setLoading(false);
                }, 200);

            } catch (err) {
                console.error('Error fetching level:', err);
                setError('Failed to load level data');
                setLoading(false);
            }
        };

        fetchLevel();
    }, [navigate, levelId]);

    const handleBackClick = () => {
        navigate('/');
    };

    const handleStartClick = () => {
        if (level && level.url) {
            window.open(level.url, '_blank');
        }
    };

    const handleFlagSubmit = async (e) => {
        e.preventDefault();

        if (!flag.trim()) {
            setFeedbackMessage('Veuillez entrer un flag');
            setIsSuccess(false);
            setShowFeedback(true);
            setTimeout(() => setShowFeedback(false), 3000);
            return;
        }

        try {
            const userId = localStorage.getItem('id');
            await awardUserPoints(userId, level._id, flag);

            setFeedbackMessage('Flag correct ! Niveau réussi');
            setIsSuccess(true);
            setShowFeedback(true);

            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (error) {
            console.error('Error submitting flag:', error);
            setFeedbackMessage('Flag incorrect');
            setIsSuccess(false);
            setShowFeedback(true);

            setTimeout(() => {
                setShowFeedback(false);
            }, 3000);
        }
    };

    if (loading) {
        return (
            <div className="full-page-loading">
                <div className="loading-indicator">
                    <img src={loadingGif} alt="Loading..." />
                </div>
            </div>
        );
    }

    if (error || !level) {
        return (
            <div className="mission-app-body">
                <div className="card">
                    <div className="card-body">
                        <p>Erreur: {error || 'Niveau non trouvé'}</p>
                        <button className="back-button" onClick={handleBackClick}>
                            Retour
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="mission-app-body">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Niveau {level.hid}</h5>
                    <div className={`level-status ${isCompleted ? 'status-success' : 'status-pending'}`}>
                        {isCompleted ? 'Terminé' : 'Non réalisé'}
                    </div>
                </div>

                <div className="card-stats">
                    <div className="card-stat">
                        <strong>Points</strong>
                        <span>{level.points}</span>
                    </div>
                    <div className="card-stat">
                        <strong>Difficulté</strong>
                        <span>{level.difficulty || 'N/A'}</span>
                    </div>
                </div>

                <div className="card-body">
                    <p className="card-text">{level.description}</p>

                    {level.url && (
                        <div className="start-section">
                            <button
                                className={`start-button ${isCompleted ? 'launch-button-done' : 'launch-button'}`}
                                onClick={handleStartClick}
                                disabled={isCompleted}
                            >
                                <i className={`fa ${isCompleted ? 'fa-circle-check' : 'fa-rocket'}`}></i>
                                <span>{isCompleted ? 'Done' : 'Start Challenge'}</span>
                            </button>
                        </div>
                    )}

                    {!isCompleted && (
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
                    )}
                </div>

                <button className="back-button" onClick={handleBackClick}>
                    Retour
                </button>
            </div>
        </div>
    );
};

export default MissionCard;
