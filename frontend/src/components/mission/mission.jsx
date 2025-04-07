import React from 'react';
import '../../assets/styles/mission.css';

const TITLE = "Objectif de la mission";
const CONTENT = "Après avoir retrouvé le vaisseau d'Arkann, une étrange inquiétude s'empare de vous : Arkann n'est nulle part en vue. Aurait-il délibérément abandonné son vaisseau pour vous mettre à l'épreuve ? Pourtant, ce dernier est hermétiquement verrouillé...";
const POINTS = 150;
const SUCCESS_RATE = "100%";

const MissionCard = ({
    title = TITLE,
    content = CONTENT,
    points = POINTS,
    successRate = SUCCESS_RATE
}) => {
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
                </div>
                <div className="arrow-left"></div>
            </div>
        </div>
    );
};

export default MissionCard;
