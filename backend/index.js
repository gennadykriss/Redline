// backend/index.js
require('dotenv').config();
const express           = require('express');
const cors              = require('cors');
const { BalldontlieAPI } = require('@balldontlie/sdk');

const app = express();
app.use(cors());  // allow your React app to call this

// Instantiate the SDK on the server, using your key from .env
console.log('Initializing SDK...');
const balldontlie = new BalldontlieAPI({
  apiKey: process.env.BALLDONTLIE_API_KEY
});
console.log('SDK initialized');

// Proxy /api/players → Balldontlie getPlayers
app.get('/api/players', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 25;
  const search = req.query.search || '';
  console.log(`Fetching players: page=${page}, per_page=${perPage}, search="${search}"`);

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
      error:   err.message,
      details: err.response?.data || err.stack
    });
  }
});

// Proxy /api/teams → Balldontlie getTeams
app.get('/api/teams', async (_req, res) => {
  console.log('Fetching teams');
  try {
    const result = await balldontlie.nba.getTeams();
    res.json(result);
  } catch (err) {
    console.error('Error fetching teams:', err);
    res.status(err.statusCode || 500).json({
      error:   err.message,
      details: err.response?.data || err.stack
    });
  }
});

// Proxy /api/games → Balldontlie getGames
app.get('/api/games', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.per_page) || 25;
  const date = req.query.date || '';
  console.log(`Fetching games: page=${page}, per_page=${perPage}, date="${date}"`);

  try {
    // Add date filter if provided, otherwise get recent games
    if (date) {
      console.log(`Filtering games for date: ${date}`);
      // For date filtering, get all games for that specific date
      const params = { 
        start_date: date,
        end_date: date,
        per_page: 100 // Get all games for the date (usually 8-15 games per day)
      };
      
      const result = await balldontlie.nba.getGames(params);
      
      console.log(`Games API response for date ${date} - data length: ${result.data.length}`);
      
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
      
      console.log(`Games API response - cursor: ${result.meta.next_cursor}, data length: ${result.data.length}`);
      
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
      error:   err.message,
      details: err.response?.data || err.stack
    });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`⚡ Proxy + SDK server listening on http://localhost:${PORT}`);
});
