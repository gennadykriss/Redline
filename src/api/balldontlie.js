// src/api/balldontlie.js
import axios from 'axios';


// Create axios instance pointing to our backend proxy
const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});


// Wrap the API calls in your own functions for consistency
export async function fetchPlayers(page = 1, perPage = 25, search = '') {
  const response = await api.get('/players', {
    params: {
      page,
      per_page: perPage,
      search: search
    }
  });
  return response.data;
}


export async function fetchPlayerStats(playerId) {
  const response = await api.get('/season_averages', { params: { player_ids: [playerId] } });
  return response.data;
}


export async function fetchTeams() {
  const response = await api.get('/teams');
  return response.data;
}

export async function fetchGames(page = 1, perPage = 25, search = '', date = '') {
  const params = {
    page,
    per_page: perPage,
    search: search
  };
  
  // If date is provided, use it for both start_date and end_date to get games for that specific date
  if (date) {
    params.start_date = date;
    params.end_date = date;
  }
  
  const response = await api.get('/games', { params });
  return response.data;
}



