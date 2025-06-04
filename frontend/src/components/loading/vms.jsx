import React, { useEffect, useState } from 'react';
import LoaderGif from '../../assets/logo/logo.gif';

const ProfileDownload = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    return (
        <div className="profile-download-container">
            <div className="download-card">
                <div className="download-header">
                    <h2>Déploiement de l'environnement</h2>
                </div>

                <div className="download-body">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '200px',
                    }}>
                        <img 
                            src={LoaderGif}
                            alt="Loading..." 
                            style={{
                                maxHeight: '70px',
                                width: 'auto',
                                height: 'auto'
                            }}
                        />
                    </div>
                </div>
                  <div className="download-intro">
                    <p>Votre environnement isolé est en cours d'installation, cela devrait prendre quelques minutes..</p><br/>
                    <p><b>Vous serez automatiquement redirigé</b></p><br/>
                </div>
            </div>
        </div>
    );
};

export default ProfileDownload;