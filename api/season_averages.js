// api/season_averages.js
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

  const playerIds = req.query.player_ids;

  if (!playerIds) {
    res.status(400).json({ error: 'player_ids parameter is required' });
    return;
  }

  try {
    const result = await balldontlie.nba.getSeasonAverages({ 
      player_ids: Array.isArray(playerIds) ? playerIds : [playerIds] 
    });
    res.json(result);
  } catch (err) {
    console.error('Error fetching season averages:', err);
    res.status(err.statusCode || 500).json({
      error: err.message,
      details: err.response?.data || err.stack
    });
  }
}
