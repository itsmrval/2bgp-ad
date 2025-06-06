import React, { useEffect, useState } from 'react';
import '../../assets/styles/profileDownload.css';
import { useAuth } from '../../api/auth/useAuth';
import LoaderGif from '../../assets/logo/logo.gif';

const ProfileDownload = () => {
    const { getProfile } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
                setError(false); 
            } catch (error) {
                console.error("Erreur lors de la récupération du profil VPN:", error);
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleDownload = () => {
        if (!profile) {
            return;
        }

        const blob = new Blob([profile], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = '2bgp.ovpn';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="profile-download-container">
            <div className="download-card">
                <div className="download-header">
                    <h2>Vous n'êtes pas connecté</h2>
                </div>

                <div className="download-intro">
                    <p>Afin d'accéder à votre environnement, connectez-vous en utilisant le profil OpenVPN</p>
                    <p><b>Vous serez automatiquement redirigé</b></p>
                </div>

                <div className="download-body">
                    <div className="os-selection">
                        <div className="os-card">
                            <div className="os-icon">💻</div>
                            <div className="os-name">Client OpenVPN</div>
                            <button
                                className="download-button"
                                onClick={() => window.open('https://www.wireguard.com/install/', '_blank')}
                            >
                                Documentation
                            </button>
                        </div>

                        <div className="os-card" onClick={() => handleDownload()}>
                            <div className="os-icon">🎯</div>
                            <div className="os-name">Profile VPN</div>
                            <button
                                className="download-button"
                                disabled={loading || error}
                            >
                                {loading ? 'Chargement' : error ? 'Error' : 'Télécharger'}
                            </button>
                        </div>
                    </div>

                    <div className="instructions">
                        <h3>Instructions</h3>
                        <p>Suivez les étapes pour configurer votre VPN :</p>
                        <ol>
                            <li>Installez le client OpenVPN sur votre appareil</li>
                            <li>Téléchargez et ouvrez le profile VPN dans l'application</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDownload;
