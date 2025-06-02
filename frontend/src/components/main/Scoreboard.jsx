import React, { useEffect, useState } from 'react';
import '../../assets/styles/scoreboard.css';
import { useAuth } from '../../api/auth/useAuth';

const Scoreboard = () => {
  const { getPoints } = useAuth();
  const [teams, setTeams] = useState([]);
  const [expandedTeams, setExpandedTeams] = useState(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPoints();
        setTeams(response);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    fetchData();
  }, [getPoints]);

  const toggleTeamExpansion = (teamRank) => {
    const newExpandedTeams = new Set(expandedTeams);
    if (newExpandedTeams.has(teamRank)) {
      newExpandedTeams.delete(teamRank);
    } else {
      newExpandedTeams.add(teamRank);
    }
    setExpandedTeams(newExpandedTeams);
  };

  const renderLevels = (levels, teamRank) => {
    const isExpanded = expandedTeams.has(teamRank);
    const shouldTruncate = levels.length > 1;
    
    if (!shouldTruncate) {
      return levels.map((level, index) => (
        <div key={index} className="member">
          <span className="member-name">Niveau {index + 1}</span>
          <span className="member-chips">({level.points ? level.points.toLocaleString() : "0"} points)</span>
        </div>
      ));
    }

    if (isExpanded) {
      return (
        <>
          {levels.map((level, index) => (
            <div key={index} className="member">
              <span className="member-name">Niveau {index + 1}</span>
              <span className="member-chips">({level.points ? level.points.toLocaleString() : "0"} points)</span>
            </div>
          ))}
          <div 
            className="member expand-toggle" 
            onClick={() => toggleTeamExpansion(teamRank)}
            style={{ cursor: 'pointer'}}
          >
            <span className="member-name">↑</span>
          </div>
        </>
      );
    } else {
      const firstLevel = levels[0];
      const hiddenCount = levels.length - 1;
      
      return (
        <>
          <div className="member">
            <span className="member-name">Niveau 1</span>
            <span className="member-chips">({firstLevel.points ? firstLevel.points.toLocaleString() : "0"} points)</span>
          </div>
          <div 
            className="member expand-toggle" 
            onClick={() => toggleTeamExpansion(teamRank)}
            style={{ cursor: 'pointer'}}
          >
            <span className="member-name">+{hiddenCount} ↓</span>
          </div>
        </>
      );
    }
  };

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
          {teams.map((team) => (
            <div key={team.rank} className="team-row">
              <div className="rank-column">
                <div className="rank-circle">{team.rank}</div>
              </div>
              <div className="team-column">
                <div className="team-name">{team.username}</div>
                <div className="team-members">
                  {renderLevels(team.achieved_levels, team.rank)}
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