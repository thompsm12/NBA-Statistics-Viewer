import { useState } from 'react'
import './App.css'
import PlayerProfile from './PlayerProfile.jsx';
import TeamRoster from './TeamRoster.jsx';
import TeamsList from './TeamList.jsx';
import PlayersList from "./PlayersList";


function App() {
  const [count, setCount] = useState(0);

  const [selectedTeamId, setSelectedTeamId] = useState(null);

  return (
    <>
      <div>

      </div>
      <h1></h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>

      </div>

    <div>
      <h1>BallDon'tLie API Example</h1>
      <TeamsList onTeamSelect={setSelectedTeamId} />
      {selectedTeamId && <PlayersList teamId={selectedTeamId} />}
    </div>

    
    </>
  )
}




export default App
