const fs = require("fs");

// Load the existing headshotMap.json
const rawData = fs.readFileSync("nba_player_headshots.json", "utf-8");
const originalMap = JSON.parse(rawData);

// Transform to { "player name": "imageUrl" }
const cleanedMap = {};

Object.values(originalMap).forEach((entry) => {
  if (!entry.name || !entry.imageUrl) return;

  const cleanedName = entry.name
    .replace(/\s+/g, " ")        // collapse multiple spaces/newlines
    .trim()
    .toLowerCase();              // normalize to lowercase for consistent lookup

  cleanedMap[cleanedName] = entry.imageUrl;
});

// Save the cleaned version to a new file
fs.writeFileSync("headshotMap_cleaned.json", JSON.stringify(cleanedMap, null, 2));

console.log("✅ Cleaned headshotMap saved as headshotMap_cleaned.json");
