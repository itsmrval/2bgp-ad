import React, { useEffect, useState } from 'react';
import '../../assets/styles/profileDownload.css';

const ProfileDownload = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className="profile-download-container">
            <div className="download-card">
                <div className="download-header">
                    <h2>Déploiement de l'environnement</h2>
                </div>

                <div className="download-intro">
                    <p>Votre environnement isolé est en cours d'installation, cela devrait prendre quelques minutes...</p>
                </div>

                <div className="download-body">
                   
                    
                </div>
            </div>
        </div>
    );
};

export default ProfileDownload;
