import React from 'react';
import '../../assets/styles/header.css'; // Import du fichier CSS séparé

const TransparentHeader = () => {
  return (
    <header className="transparent-header">
      <div className="logo">Logo</div>
      <nav className="main-nav">
        <ul>
          <li>Accueil</li>
          <li>Informations</li>
          <li>Scoreboard</li>
        </ul>
      </nav>
    </header>
  );
};

export default TransparentHeader;