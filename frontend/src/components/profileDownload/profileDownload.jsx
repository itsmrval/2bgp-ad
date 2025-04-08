import React from 'react';
import '../../assets/styles/profileDownload.css';

const ProfileDownload = () => {
    const handleDownload = (os) => {
        // Cette fonction sera implémentée plus tard
        console.log(`Téléchargement du profil pour ${os}`);
        alert(`La fonctionnalité de téléchargement pour ${os} sera implémentée prochainement.`);
    };

    return (
        <div className="profile-download-container">
            <div className="download-card">
                <div className="download-header">
                    <h2>Téléchargement du Profil VPN</h2>
                </div>
                
                <div className="download-intro">
                    <p>Texte présentation doit aller ici</p>
                </div>
                
                <div className="download-body">
                    <p>Texte introduction doit aller ici</p>
                    
                    <div className="os-selection">
                        <div className="os-card" onClick={() => handleDownload('Windows')}>
                            <div className="os-icon">💻</div>
                            <div className="os-name">Windows</div>
                            <button className="download-button">Télécharger</button>
                        </div>
                        
                        <div className="os-card" onClick={() => handleDownload('macOS')}>
                            <div className="os-icon">🍎</div>
                            <div className="os-name">macOS</div>
                            <button className="download-button">Télécharger</button>
                        </div>
                        
                        <div className="os-card" onClick={() => handleDownload('Linux')}>
                            <div className="os-icon">🐧</div>
                            <div className="os-name">Linux</div>
                            <button className="download-button">Télécharger</button>
                        </div>
                    </div>
                    
                    <div className="instructions">
                        <h3>Instructions</h3>
                        <p>Texte tutoriel doit aller ici</p>
                        <ol>
                            <li>Étape 1</li>
                            <li>Étape 2</li>
                            <li>Étape 3</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDownload;
