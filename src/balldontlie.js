const API_BASE_URL = "https://api.balldontlie.io/v1";

const API_KEY = "466dac4f-f87f-448c-8ef0-cf44150ee662"; //api key from ball dont lie

export async function fetchTeams() {
  const response = await fetch(`${API_BASE_URL}/teams`, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch teams: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}
