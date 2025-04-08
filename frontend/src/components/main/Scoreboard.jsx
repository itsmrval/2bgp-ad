import React from 'react';
import '../../assets/styles/scoreboard.css';

const Scoreboard = () => {
  // Plus d'équipes pour tester le défilement
  const mockTeams = [
    {
      name: "Danny's Crew",
      rank: 1,
      total_points: 12500000,
      members: [
        { username: "Danny Ocean", points: 5500000 },
        { username: "Rusty Ryan", points: 4000000 },
        { username: "Linus Caldwell", points: 3000000 }
      ]
    },
    {
      name: "Casino Royals",
      rank: 2,
      total_points: 8750000,
      members: [
        { username: "Reuben Tishkoff", points: 3250000 },
        { username: "Basher Tarr", points: 2800000 },
        { username: "Saul Bloom", points: 2700000 }
      ]
    },
    {
      name: "The Insiders",
      rank: 3,
      total_points: 6300000,
      members: [
        { username: "Frank Catton", points: 2300000 },
        { username: "Livingston Dell", points: 2000000 },
        { username: "Virgil Malloy", points: 1000000 },
        { username: "Turk Malloy", points: 1000000 }
      ]
    },
    {
      name: "Night Foxes",
      rank: 4,
      total_points: 4200000,
      members: [
        { username: "Yen", points: 1800000 },
        { username: "Tess Ocean", points: 1400000 },
        { username: "Terry Benedict", points: 1000000 }
      ]
    },
    {
      name: "Bellagio Bandits",
      rank: 5,
      total_points: 2800000,
      members: [
        { username: "Roman Nagel", points: 1200000 },
        { username: "Isabel Lahiri", points: 900000 },
        { username: "Toulour", points: 700000 }
      ]
    },
    // Équipes supplémentaires pour tester le défilement
    {
      name: "Bank Robbers",
      rank: 6,
      total_points: 2400000,
      members: [
        { username: "Willy Bank", points: 1000000 },
        { username: "Abigail Sponder", points: 800000 },
        { username: "The Greco", points: 600000 }
      ]
    },
    {
      name: "Vegas Vipers",
      rank: 7,
      total_points: 2100000,
      members: [
        { username: "Matsui", points: 900000 },
        { username: "Eddie Izzard", points: 700000 },
        { username: "Vincent Cassel", points: 500000 }
      ]
    },
    {
      name: "Card Sharks",
      rank: 8,
      total_points: 1800000,
      members: [
        { username: "Ellen Barkin", points: 800000 },
        { username: "Al Pacino", points: 600000 },
        { username: "Andy Garcia", points: 400000 }
      ]
    },
    {
      name: "Lucky Sevens",
      rank: 9,
      total_points: 1500000,
      members: [
        { username: "Julia Roberts", points: 700000 },
        { username: "Catherine Zeta-Jones", points: 500000 },
        { username: "Bernie Mac", points: 300000 }
      ]
    },
    {
      name: "Slot Masters",
      rank: 10,
      total_points: 1200000,
      members: [
        { username: "Carl Reiner", points: 500000 },
        { username: "Elliott Gould", points: 400000 },
        { username: "Don Cheadle", points: 300000 }
      ]
    },{
        name: "Danny's Crew",
        rank: 11,
        total_points: 12500000,
        members: [
          { username: "Danny Ocean", points: 5500000 },
          { username: "Rusty Ryan", points: 4000000 },
          { username: "Linus Caldwell", points: 3000000 }
        ]
      },
  ];

  return (
    <div className="scoreboard-content">
      {/* Section de titre masquée par CSS */}
      <div className="scoreboard-header-section">
        <h1 className="scoreboard-title">OCEAN'S ELEVEN</h1>
        <h2 className="scoreboard-subtitle">CASINO HEIST LEADERBOARD</h2>
      </div>
      
      <div className="scoreboard-table-container">
        <div className="scoreboard-table-header">
          <div className="rank-column">RANK</div>
          <div className="team-column">TEAM</div>
          <div className="chips-column">CASINO CHIPS</div>
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