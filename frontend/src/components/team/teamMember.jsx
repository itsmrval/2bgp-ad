import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const TeamMember = ({ name, role, bio, avatar, linkedin, github, email }) => {
    // Utilisation des initiales si pas d'avatar
    const initials = name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
        
    return (
        <div className="member-card">
            <div className="member-card-header"></div>
            <div className="member-avatar">
                {avatar ? (
                    <img src={avatar} alt={name} />
                ) : (
                    <span style={{ 
                        fontSize: '2.5rem', 
                        fontWeight: 'bold',
                        color: '#cc0000' /* Rouge plus cohérent */
                    }}>
                        {initials}
                    </span>
                )}
            </div>
            <div className="member-info">
                <h3 className="member-name">{name}</h3>
                <div className="member-role">{role}</div>
                <p className="member-bio">{bio}</p>
                <div className="social-links">
                    {email && (
                        <a href={`mailto:${email}`} className="social-link" title="Email">
                            <FaEnvelope />
                        </a>
                    )}
                    {linkedin && (
                        <a href={linkedin} className="social-link" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                            <FaLinkedin />
                        </a>
                    )}
                    {github && (
                        <a href={github} className="social-link" target="_blank" rel="noopener noreferrer" title="GitHub">
                            <FaGithub />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TeamMember;
