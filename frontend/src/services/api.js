import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Register a user
export const registerUser = (username, password) => {
  return api.post('/auth/register', { username, password });
};

// Login a user
export const loginUser = (username, password) => {
  return api.post('/auth/login', { username, password });
};

// Fetch the watchlist
export const getWatchlist = (token) => {
  return api.get('/watchlist', {
    headers: { 'x-auth-token': token }
  });
};

// Add a stock to the watchlist
export const addStockToWatchlist = (ticker, token) => {
  return api.post('/watchlist/add', { ticker }, {
    headers: { 'x-auth-token': token }
  });
};

// Remove a stock from the watchlist
export const removeStockFromWatchlist = (ticker, token) => {
  return api.post('/watchlist/remove', { ticker }, {
    headers: { 'x-auth-token': token }
  });
};

// Fetch stock prices
// export const getStockPrices = (tickers, token) => {
//   return api.get(/stocks/prices?tickers=${tickers.join(',')}, {
//     headers: { 'x-auth-token': token }
//   });
// };

// Fetch stock prices
export const getStockPrices = (tickers, token) => {
  return api.get(`/stocks/prices?tickers=${tickers.join(',')}`, {
    headers: { 'x-auth-token': token }
  });
};
