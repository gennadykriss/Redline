// api/players.js
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

  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 25;
  const search = req.query.search || '';

  try {
    const params = { per_page: perPage };
    if (search) params.search = search;
    
    // Convert page to cursor for the API
    if (page > 1) {
      params.cursor = (page - 1) * perPage;
    }

    const result = await balldontlie.nba.getPlayers(params);
    
    // Transform response to include page-based metadata
    const hasNextPage = result.meta.next_cursor !== null;
    const transformedResult = {
      ...result,
      meta: {
        ...result.meta,
        current_page: page,
        total_count: hasNextPage ? (page * perPage) + 1 : (page - 1) * perPage + result.data.length,
        per_page: perPage,
        next_page: hasNextPage ? page + 1 : null,
        prev_page: page > 1 ? page - 1 : null
      }
    };
    
    res.json(transformedResult);
  } catch (err) {
    console.error('Error fetching players:', err);
    res.status(err.statusCode || 500).json({
      error: err.message,
      details: err.response?.data || err.stack
    });
  }
}
