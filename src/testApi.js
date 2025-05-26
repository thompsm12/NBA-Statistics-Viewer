// testApi.js
// just a simple script to test BallDontLieAPI

import fetch from 'node-fetch'; // install with: npm install node-fetch

const API_KEY = '466dac4f-f87f-448c-8ef0-cf44150ee662';

const response = await fetch('https://api.balldontlie.io/v1/teams', {
  headers: {
    Authorization: API_KEY
  }
});

const data = await response.json();
console.log(data);
