import React from 'react';
import PlayerProfile from './PlayerProfile.jsx';

const TeamRoster = ({ teamName, players }) => {
  return (
    <div>
      <h1>{teamName} Roster</h1>
      <div style={styles.rosterContainer}>
        {players.map(player => (
          <PlayerProfile key={player.name} player={player} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  rosterContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default TeamRoster;
