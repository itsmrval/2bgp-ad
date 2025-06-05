import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import '../../assets/styles/team.css';
import vpImage from '../../assets/img/vp.png';
import cbImage from '../../assets/img/cb.png';
import fgImage from '../../assets/img/fg.png';
import mbImage from '../../assets/img/mb.png';

const Team = () => {
    const teamMembers = [
        {
            name: "Valentin PUCCETTI",
            bio: "IUT-Velizy",
            email: "contact@valentinp.fr",
            linkedin: "https://linkedin.com/in/valentin-p",
            github: "https://github.com/itsmrval",
            image: vpImage
        },
        {
            name: "Corentin BONNEAU",
            bio: "IUT-Velizy",
            linkedin: "https://linkedin.com/in/bonneau-corentin",
            image: cbImage
        },
        {
            name: "François GOYA LONGO",
            bio: "IUT-Velizy",
            email: "membre3@example.com",
            linkedin: "https://linkedin.com/in/fran%c3%a7ois-goya-longo-84574227b",
            image: fgImage
        },
        {
            name: "Mathieu BERSIN",
            bio: "IUT-Velizy",
            linkedin: "https://linkedin.com/in/mathieu-bersin-367270269",
            image: mbImage
        }
    ];

    // Sort team members by last name alphabetically
    const sortedTeamMembers = [...teamMembers].sort((a, b) => {
        const lastNameA = a.name.split(' ').pop();
        const lastNameB = b.name.split(' ').pop();
        return lastNameA.localeCompare(lastNameB);
    });

    return (
        <div className="team-container">
            <div className="team-header">
                <h2>À propos du projet</h2>
                <p>2bgp-ctf est une plateforme de capture du drapeau (CTF) conçue pour aider les étudiants à apprendre et à mettre en pratique les compétences en matière de cybersécurité à travers une série de défis.</p>
            </div>

            <div className="team-members-list">
                {sortedTeamMembers.map((member, index) => (
                    <div key={index} className="member-block">
                        <div className="member-avatar">
                            <img
                                src={member.image}
                                alt={`Photo de ${member.name}`}
                                className="member-image"
                            />
                        </div>
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
