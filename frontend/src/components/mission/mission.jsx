import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLevel, awardUserPoints } from '../../api/calls';
import '../../assets/styles/mission.css';
import { useAuth } from '../../api/auth/useAuth';
import loadingGif from '../../assets/logo/logo.gif';

const MissionCard = () => {
    const { user } = useAuth();
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
                    setError('Level ID is missing');
                    setLoading(false);
                    return;
                }

                const response = await getLevel(levelId);

                if (response) {
                    setLevel(response);
                } else {
                    setError('An error occurred while fetching the level.');
                }

                setTimeout(() => {
                    setLoading(false);
                }, 200);

            } catch (err) {
                console.error('Error fetching level:', err);
                setError('An error occurred while fetching the level.');
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
        const userId = user.id;
        await awardUserPoints(userId, level._id, flag);

        setFeedbackMessage('Flag correct ! Niveau réussi');
        setIsSuccess(true);
        setShowFeedback(true);

        navigate('/');
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
                        <p>Error: {error || 'Level not found'}</p>
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
                    <p className="card-text" dangerouslySetInnerHTML={{ __html: level.description }}></p>

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
