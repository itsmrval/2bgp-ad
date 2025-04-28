import React from 'react';
import '../../assets/styles/scoreboard.css';

const Scoreboard = () => {
  // Plus d'équipes pour tester le défilement
  const mockTeams = [
    {
      name: "Danny",
      rank: 1,
      total_points: 12500000,
      members: [
        { username: "Points acquis:", points: 5500000 },
      ]
    },
    {
      name: "Casino",
      rank: 2,
      total_points: 8750000,
      members: [
        { username: "Points acquis:", points: 5500000 },
      ]
    },
    {
      name: "The",
      rank: 3,
      total_points: 6300000,
      members: [
        { username: "Points acquis:", points: 5500000 },
      ]
    },
    {
      name: "Night Foxes",
      rank: 4,
      total_points: 4200000,
      members: [
        { username: "Points acquis:", points: 5500000 },
      ]
    },
    {
      name: "Bellagio Bandits",
      rank: 5,
      total_points: 2800000,
      members: [
        { username: "Points acquis:", points: 5500000 },
      ]
    },
    {
      name: "Bank Robbers",
      rank: 6,
      total_points: 2400000,
      members: [
        { username: "Points acquis:", points: 5500000 },

      ]
    },
    {
      name: "Vegas Vipers",
      rank: 7,
      total_points: 2100000,
      members: [
        { username: "Points acquis:", points: 5500000 },

      ]
    }
  ];

  return (
    <div className="scoreboard-content">
      <div className="team-header">
        <h2>Tableau des scores</h2>
        <p>Classement des différents joueurs de la plateforme</p>
      </div>
      
      <div className="scoreboard-table-container">
        <div className="scoreboard-table-header">
          <div className="rank-column"></div>
          <div className="team-column">NOM DU JOUEUR</div>
          <div className="chips-column">POINTS</div>
        </div>

        <div className="scoreboard-table-body">
          {mockTeams.map((team) => (
            <div key={team.name} className="team-row">
              <div className="rank-column">
                <div className="rank-circle">{team.rank}</div>
              </div>
              <div className="team-column">
                <div className="team-name">{team.name}</div>
                <div className="team-members">
                  {team.members.map((member) => (
                    <div key={member.username} className="member">
                      <span className="member-name">{member.username}</span>
                      <span className="member-chips">{member.points.toLocaleString()} chips</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="chips-column">
                <span className="chips-value">${team.total_points.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;