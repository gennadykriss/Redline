// api/games.js
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
  const date = req.query.date || '';

  try {
    // Add date filter if provided, otherwise get recent games
    if (date) {
      // For date filtering, get all games for that specific date
      const params = { 
        start_date: date,
        end_date: date,
        per_page: 100 // Get all games for the date (usually 8-15 games per day)
      };
      
      const result = await balldontlie.nba.getGames(params);
      
      // Sort games by date (most recent first) on the server side
      if (result.data && result.data.length > 0) {
        result.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      
      // For date filtering, we typically get all games for that date, so no pagination needed
      // But we'll still simulate pagination for consistency
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const paginatedData = result.data.slice(startIndex, endIndex);
      
      const totalGames = result.data.length;
      const totalPages = Math.ceil(totalGames / perPage);
      
      const transformedResult = {
        data: paginatedData,
        meta: {
          current_page: page,
          total_count: totalGames,
          per_page: perPage,
          next_page: page < totalPages ? page + 1 : null,
          prev_page: page > 1 ? page - 1 : null
        }
      };
      
      res.json(transformedResult);
    } else {
      // No date filter - get season games with pagination
      const params = { 
        per_page: 100, // Fetch larger chunks to simulate pagination
        seasons: [2023] // Default to 2023 season for demonstration
      };

      const result = await balldontlie.nba.getGames(params);
      
      // Sort games by date (most recent first) on the server side
      if (result.data && result.data.length > 0) {
        result.data.sort((a, b) => new Date(b.date) - new Date(a.date));
      }
      
      // Simulate pagination by slicing the results
      const startIndex = (page - 1) * perPage;
      const endIndex = startIndex + perPage;
      const paginatedData = result.data.slice(startIndex, endIndex);
      
      // Create paginated response
      const totalGames = result.data.length;
      const totalPages = Math.ceil(totalGames / perPage);
      
      const transformedResult = {
        data: paginatedData,
        meta: {
          current_page: page,
          total_count: totalGames,
          per_page: perPage,
          next_page: page < totalPages ? page + 1 : null,
          prev_page: page > 1 ? page - 1 : null
        }
      };
      
      res.json(transformedResult);
    }
  } catch (err) {
    console.error('Error fetching games:', err);
    res.status(err.statusCode || 500).json({
      error: err.message,
      details: err.response?.data || err.stack
    });
  }
}
