import { useState } from 'react'
import './App.css'
import PlayerProfile from './PlayerProfile.jsx';
import TeamRoster from './TeamRoster.jsx';
import TeamsList from './TeamList.jsx';

const denverNuggetsPlayers = [
  {
    name: 'Nikola Jokić',
    position: 'C',
    photo: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203999.png',
    stats: { ppg: 27.1, rpg: 13.8, apg: 7.9 },
  },
  {
    name: 'Jamal Murray',
    position: 'PG',
    photo: 'https://cdn.nba.com/headshots/nba/latest/1040x760/203084.png',
    stats: { ppg: 19.8, rpg: 4.2, apg: 5.3 },
  },
  {
    name: 'Michael Porter Jr.',
    position: 'SF',
    photo: 'https://cdn.nba.com/headshots/nba/latest/1040x760/1629628.png',
    stats: { ppg: 15.4, rpg: 7.3, apg: 1.3 },
  },
];


const player = {
  name: 'LeBron James',
  team: 'Los Angeles Lakers',
  position: 'SF',
  photo: 'https://cdn.nba.com/headshots/nba/latest/1040x760/2544.png',
  stats: {
    ppg: 27.2,
    rpg: 7.4,
    apg: 7.2,
  },
};

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>

      </div>
      <h1>Statistics Viewer Website</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

    <div>
      <h1>BallDon'tLie API Example</h1>
      <TeamsList />
    </div>

    <div style={{ padding: 20 }}>
      <TeamRoster teamName="Denver Nuggets" players={denverNuggetsPlayers} />
    </div>
      <div>
        <h1>NBA Player Profile</h1>
        <PlayerProfile player={player} />
    </div>
    </>
  )
}




export default App
