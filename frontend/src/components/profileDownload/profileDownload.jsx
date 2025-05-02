import React, { useEffect, useState } from 'react';
import '../../assets/styles/profileDownload.css';
import { useAuth } from '../../api/auth/useAuth';

const ProfileDownload = () => {
    const { getProfile } = useAuth();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile(data);
            } catch (error) {
                console.error("Erreur lors de la récupération du profil VPN:", error);
            }
        };

        fetchProfile();
    }, [getProfile]);

    const handleDownload = (os) => {
        if (!profile) {
            alert('Le profil VPN n\'est pas encore chargé.');
            return;
        }

        const blob = new Blob([profile], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'wg_2bgp.conf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log(`Téléchargement du profil pour ${os}`);
    };

    return (
        <div className="profile-download-container">
            <div className="download-card">
                <div className="download-header">
                    <h2>Téléchargement du Profil VPN</h2>
                </div>

                <div className="download-intro">
                    <p>Vous pouvez télécharger votre configuration VPN WireGuard pour votre système d’exploitation.</p>
                </div>

                <div className="download-body">
                    <p>Sélectionnez votre système pour commencer le téléchargement :</p>

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
                        <p>Suivez les étapes suivantes pour configurer votre VPN :</p>
                        <ol>
                            <li>Téléchargez le fichier de configuration</li>
                            <li>Installez WireGuard sur votre appareil</li>
                            <li>Importez le fichier dans l’application WireGuard</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileDownload;
