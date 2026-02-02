import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || 'your_api_key_here';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchMovies = async () => {
  const response = await api.get('/movie/popular');
  return response.data.results;
}

export default api;