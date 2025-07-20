// api/teams.js
const { BalldontlieAPI } = require('@balldontlie/sdk');

// Initialize the SDK
const balldontlie = new BalldontlieAPI({
  apiKey: process.env.BALLDONTLIE_API_KEY
});

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const result = await balldontlie.nba.getTeams();
    res.json(result);
  } catch (err) {
    console.error('Error fetching teams:', err);
    res.status(err.statusCode || 500).json({
      error: err.message,
      details: err.response?.data || err.stack
    });
  }
}
