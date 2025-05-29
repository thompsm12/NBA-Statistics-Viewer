// const fs = require("fs");

// // Load the existing headshotMap.json
// const rawData = fs.readFileSync("nba_player_headshots.json", "utf-8");
// const originalMap = JSON.parse(rawData);

// // Transform to { "player name": "imageUrl" }
// const cleanedMap = {};

// Object.values(originalMap).forEach((entry) => {
//   if (!entry.name || !entry.imageUrl) return;

//   const cleanedName = entry.name
//     .replace(/\s+/g, " ")        // collapse multiple spaces/newlines
//     .trim()
//     .toLowerCase();              // normalize to lowercase for consistent lookup

//   cleanedMap[cleanedName] = entry.imageUrl;
// });

// // Save the cleaned version to a new file
// fs.writeFileSync("headshotMap_cleaned.json", JSON.stringify(cleanedMap, null, 2));

// console.log("✅ Cleaned headshotMap saved as headshotMap_cleaned.json");

const fs = require("fs");
const path = require("path");

// Load your raw headshot map
const inputPath = path.resolve(__dirname, "nba_player_headshots.json");
const outputPath = path.resolve(__dirname, "headshotMap_clean.json");

// Function to remove accents and normalize name keys
const normalizeNameKey = (name) =>
  name
    .normalize("NFD") // Split characters and diacritics
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/\s+/g, "") // Remove all whitespace
    .replace(/[^a-zA-Z\-]/g, "") // Remove non-letter characters except hyphen
    .toLowerCase(); // Convert to lowercase

try {
  const rawData = fs.readFileSync(inputPath, "utf-8");
  const originalMap = JSON.parse(rawData);

  const cleanedMap = {};

  for (const key in originalMap) {
    const url = originalMap[key];
    const cleanKey = normalizeNameKey(key);

    if (!cleanKey) {
      console.warn(`Invalid key from name: "${key}"`);
      continue;
    }

    cleanedMap[cleanKey] = url;
  }

  fs.writeFileSync(outputPath, JSON.stringify(cleanedMap, null, 2));
  console.log(`Cleaned map written to ${outputPath}`);
} catch (err) {
  console.error("Failed to clean headshot map:", err.message);
}
