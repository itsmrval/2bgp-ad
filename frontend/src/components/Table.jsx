import React from 'react';

const BlackjackTable = () => {
  // Dimensions du SVG
  const width = 800;
  const height = 500;
  const backgroundColor = '#087a0d'; // Vert typique de table de casino

  // Configuration du ruban / bannière
  const bannerColor = '#FFD700'; // Doré
  const textColor = '#000';

  // Configuration pour les positions des cartes (emplacements pour les joueurs)
  const numberOfSeats = 7;
  const seatRadius = 220;   // Rayon du cercle sur lequel seront placées les cartes
  const seatWidth = 40;
  const seatHeight = 60;
  const seatFill = '#FAF9F6';

  // Centre de l'arc (pour le placement des cartes)
  const centerX = width / 2;
  const centerY = 370;

  // Définition des angles en radians pour répartir les cartes le long d'un grand arc
  // Ici, on part de -45° à +225° (en radians)
  const arcStart = -Math.PI / 4;   
  const arcEnd = Math.PI + Math.PI / 4; 

  // Génération des emplacements de cartes avec transformation pour suivre la courbure.
  const seats = Array.from({ length: numberOfSeats }).map((_, i) => {
    // Calcul de l'angle pour chaque carte
    const ratio = i / (numberOfSeats - 1);
    const angle = arcStart + ratio * (arcEnd - arcStart);
    // Calcul des coordonnées sur l'arc
    const x = centerX + seatRadius * Math.cos(angle);
    const y = centerY + seatRadius * Math.sin(angle);
    // Pour que la carte suive l'arc, on la fait pivoter.
    // L'angle de rotation (en degrés) est ici ajusté avec +90°
    // ce qui fait pointer le bas de la carte vers l'extérieur du cercle.
    const angleDeg = (angle * 180) / Math.PI + 90;

    return (
      <g key={i} transform={`translate(${x}, ${y}) rotate(${angleDeg})`}>
        <rect
          x={-seatWidth / 2}
          y={-seatHeight / 2}
          width={seatWidth}
          height={seatHeight}
          fill={seatFill}
          stroke="#000"
          strokeWidth={2}
          rx={8} // coins arrondis
        />
      </g>
    );
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ backgroundColor }}
    >
      {/* Définition des chemins utilisés pour le texte en arc */}
      <defs>
        {/* Chemin pour le titre principal */}
        <path
          id="titleArc"
          d="M150,70 A250,250 0 0,1 650,70"
          fill="none"
        />
        {/* Chemin pour le texte d'assurance */}
        <path
          id="insuranceArc"
          d="M150,120 A250,250 0 0,1 650,120"
          fill="none"
        />
      </defs>

      {/* Bannière en fond (rectangle avec coins arrondis) */}
      <rect x="150" y="40" width="500" height="40" fill={bannerColor} rx={10} />

      {/* Texte principal en arc */}
      <text fill={textColor} fontSize="20" fontWeight="bold">
        <textPath href="#titleArc" startOffset="50%" textAnchor="middle">
          BLACKJACK PAYS 3 TO 2
        </textPath>
      </text>

      {/* Texte sous le titre (positionné de manière linéaire) */}
      <text fill={textColor} fontSize="14" x="400" y="100" textAnchor="middle">
        dealer must stand on 17 and must draw to 16
      </text>

      {/* Texte pour l'assurance en arc */}
      <text fill="#FFC72C" fontSize="20" fontWeight="bold">
        <textPath href="#insuranceArc" startOffset="50%" textAnchor="middle">
          INSURANCE PAYS 2 TO 1
        </textPath>
      </text>

      {/* Emplacements des cartes (les sièges) disposés en arc */}
      {seats}
    </svg>
  );
};

export default BlackjackTable;
