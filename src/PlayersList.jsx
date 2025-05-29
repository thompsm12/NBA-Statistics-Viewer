import React, { useEffect, useState } from "react";
import { fetchPlayersByTeam } from "./balldontlie.js";
import headshotMap from "./headshotMap_clean.json"; // Make sure this file is present

const PlayersList = ({ teamId }) => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedPlayerId, setExpandedPlayerId] = useState(null);

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const data = await fetchPlayersByTeam(teamId);
        setPlayers(data.data);
      } catch (err) {
        setError(err.message || "Failed to load players");
      } finally {
        setLoading(false);
      }
    };

    if (teamId) loadPlayers();
  }, [teamId]);

  const handleToggle = (playerId) => {
    setExpandedPlayerId((prevId) => (prevId === playerId ? null : playerId));
  };

  const getHeadshotUrl = (firstName, lastName) => {
  const fullName = `${firstName}${lastName}`.replace(/\n/g, "").trim().toLowerCase();
  console.log(fullName);
  const url = headshotMap[fullName];
  if (!url) {
    console.warn(`Headshot not found for: ${fullName}`);
  }
//   console.log("Available headshot names:", Object.keys(headshotMap));

  return url || null;
};

  if (loading) return <p>Loading players...</p>;
  if (error) return <p>Error: {error}</p>;
  if (players.length === 0) return <p>No players found for this team.</p>;

  return (
    <div>
      <h3>Players</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
        {players.map((player) => {
          const isExpanded = expandedPlayerId === player.id;
          const headshotUrl = getHeadshotUrl(player.first_name, player.last_name);

          return (
            <div
              key={player.id}
              style={{
                width: "250px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "12px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <button
                onClick={() => handleToggle(player.id)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "16px",
                  fontWeight: "bold",
                  color: "#007bff",
                  cursor: "pointer",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                {player.first_name} {player.last_name}
              </button>

              {isExpanded && (
                <div style={{ marginTop: "10px", color: "#007bff" }}>
                  {headshotUrl && (
                    <img
                      src={headshotUrl}
                      alt={`${player.first_name} ${player.last_name}`}
                      style={{ width: "100%", borderRadius: "6px", marginBottom: "10px" }}
                    />
                  )}
                  <p><strong>Position:</strong> {player.position || "N/A"}</p>
                  <p>
                    <strong>Height:</strong>{" "}
                    {player.height_feet
                      ? `${player.height_feet}'${player.height_inches}"`
                      : "N/A"}
                  </p>
                  <p><strong>Team:</strong> {player.team.full_name}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayersList;
