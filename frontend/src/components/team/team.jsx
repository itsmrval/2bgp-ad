import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import '../../assets/styles/team.css';

const Team = () => {
    // Données des membres de l'équipe
    const teamMembers = [
        {
            name: "Valentin PUCCETTI",
            bio: "Texte descriptif doit aller ici",
            email: "contact@valentinp.fr",
            linkedin: "https://linkedin.com/in/valentin-p",
            github: "https://github.com/itsmrval"
        },
        {
            name: "Corentin BONNEAU", 
            bio: "Texte descriptif doit aller ici",
            linkedin: "https://linkedin.com/in/bonneau-corentin",
        },
        {
            name: "François GOYA LONGO",
            bio: "Texte descriptif doit aller ici",
            email: "membre3@example.com",
            linkedin: "https://linkedin.com/in/fran%c3%a7ois-goya-longo-84574227b",
        },
        {
            name: "Mathieu BERSIN",
            bio: "Texte descriptif doit aller ici",
            linkedin: "https://linkedin.com/in/mathieu-bersin-367270269",
        }
    ];
    
    // Fonction pour générer les initiales
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="team-container">
            <div className="team-header">
                <h2>À propos du projet</h2>
                <p>2bgp-ctf est une plateforme de capture du drapeau (CTF) conçue pour aider les étudiants à apprendre et à mettre en pratique les compétences en matière de cybersécurité à travers une série de défis.</p>
            </div>
            
            <div className="team-members-list">
                {teamMembers.map((member, index) => (
                    <div key={index} className="member-block">
                        <div className="member-initials">{getInitials(member.name)}</div>
                        <div className="member-info">
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-bio">{member.bio}</p>
                        </div>
                        <div className="member-socials">
                            {member.email && (
                                <a href={`mailto:${member.email}`} className="social-icon" title="Email">
                                    <FaEnvelope />
                                </a>
                            )}
                            {member.linkedin && (
                                <a href={member.linkedin} className="social-icon" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                    <FaLinkedin />
                                </a>
                            )}
                            {member.github && (
                                <a href={member.github} className="social-icon" target="_blank" rel="noopener noreferrer" title="GitHub">
                                    <FaGithub />
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
