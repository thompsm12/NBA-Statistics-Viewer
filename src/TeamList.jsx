import React, { useEffect, useState } from "react";
import { fetchTeams } from "./balldontlie.js";

const TeamsList = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const data = await fetchTeams();
        setTeams(data.data); // 'data' array inside the response
      } catch (err) {
        setError(err.message || "Failed to load teams");
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) return <p>Loading NBA teams...</p>;
  if (error) return <p>Error: {error.message}</p>;


  return (
    <div>
      <h2>NBA Teams</h2>
      <ul>
        {teams.map(team => (
          <li key={team.id}>
            {team.full_name} ({team.abbreviation})
          </li>
        ))}
      </ul>

    <ul style={{ listStyle: 'none', padding: 0 }}>
      {teams.map(team => (
        <li key={team.id} style={{ margin: '8px 0' }}>
          <button
            onClick={() => onTeamClick(team)}
            style={{
              cursor: 'pointer',
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              backgroundColor: '#f0f0f0',
            }}
          >
            {team.full_name}
          </button>
        </li>
      ))}
    </ul>

    <select onChange={(e) => console.log(e.target.value)}>
  {teams.map((team) => (
    <option key={team.id} value={team.id}>
      {team.full_name} ({team.abbreviation})
    </option>
  ))}
</select>
    </div>
    
  );
};

export default TeamsList;
