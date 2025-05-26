import React from 'react';

const PlayerProfile = ({ player }) => {
  return (
    <div style={styles.card}>
      <img
        src={player.photo}
        alt={`${player.name} photo`}
        style={styles.photo}
      />
      <h2>{player.name}</h2>
      <p><strong>Team:</strong> {player.team}</p>
      <p><strong>Position:</strong> {player.position}</p>
      <h3>Stats</h3>
      <ul>
        <li><strong>Points per Game:</strong> {player.stats.ppg}</li>
        <li><strong>Rebounds per Game:</strong> {player.stats.rpg}</li>
        <li><strong>Assists per Game:</strong> {player.stats.apg}</li>
      </ul>
    </div>
  );
};


const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: 8,
    padding: 20,
    maxWidth: 300,
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  photo: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 15,
  },
};

export default PlayerProfile;
