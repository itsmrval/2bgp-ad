import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import '../../assets/styles/team.css';

const Team = () => {
    // Données des membres de l'équipe
    const teamMembers = [
        {
            name: "Membre 1",
            bio: "Texte descriptif doit aller ici",
            email: "membre1@example.com",
            linkedin: "https://linkedin.com/in/membre1",
            github: "https://github.com/membre1"
        },
        {
            name: "Membre 2", 
            bio: "Texte descriptif doit aller ici",
            email: "membre2@example.com",
            linkedin: "https://linkedin.com/in/membre2",
            github: "https://github.com/membre2"
        },
        {
            name: "Membre 3",
            bio: "Texte descriptif doit aller ici",
            email: "membre3@example.com",
            linkedin: "https://linkedin.com/in/membre3",
            github: "https://github.com/membre3"
        },
        {
            name: "Membre 4",
            bio: "Texte descriptif doit aller ici",
            email: "membre4@example.com",
            linkedin: "https://linkedin.com/in/membre4",
            github: "https://github.com/membre4"
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
                <h2>The MasterMinds</h2>
                <p>Texte de présentation doit aller ici</p>
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
