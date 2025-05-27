//this is a script to retrieve all the active nba players and a link to their headshot from the official NBA website

//there was some issues with automating the nav through the table so it must be done manually

const puppeteer = require('puppeteer');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function waitForEnter() {
  return new Promise(resolve => rl.question('➡️ Go to next page and press Enter (or type "done" to finish): ', resolve));
}

(async () => {
  const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
  const page = await browser.newPage();

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36'
  );

  console.log('Opening NBA players page');
  await page.goto('https://www.nba.com/players', {
    waitUntil: 'networkidle2',
    timeout: 60000,
  });

  const players = new Map(); // key: player ID, value: { name, imageUrl }

  while (true) {
    console.log('🔍 Scraping current page...');
    await page.waitForSelector('table tbody tr', { timeout: 20000 });

    const data = await page.evaluate(() => {
      const baseImageUrl = 'https://cdn.nba.com/headshots/nba/latest/1040x760/';
      return Array.from(document.querySelectorAll('table tbody tr')).map(row => {
        const anchor = row.querySelector('a[href^="/player/"]');
        const name = anchor?.innerText.trim();
        const href = anchor?.getAttribute('href');
        const match = href?.match(/\/player\/(\d+)\//);
        const playerId = match?.[1];
        const imageUrl = playerId ? baseImageUrl + playerId + '.png' : null;

        return (name && imageUrl) ? { name, imageUrl } : null;
      }).filter(Boolean);
    });

    data.forEach(player => {
      if (!players.has(player.imageUrl)) {
        players.set(player.imageUrl, player.name);
        console.log(`${player.name} - ${player.imageUrl}`);
      }
    });

    const response = await waitForEnter();
    if (response.trim().toLowerCase() === 'done') break;
  }

  rl.close();
  await browser.close();

  const finalList = Array.from(players.entries()).map(([imageUrl, name]) => ({ name, imageUrl }));
  console.log(` Total players collected: ${finalList.length}`);
  fs.writeFileSync('nba_player_headshots.json', JSON.stringify(finalList, null, 2));
})();
