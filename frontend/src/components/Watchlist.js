import React, { useState, useEffect } from 'react';
import { getWatchlist, addStockToWatchlist, removeStockFromWatchlist } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Watchlist({ token }) {
  const [watchlist, setWatchlist] = useState([]);
  const [ticker, setTicker] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWatchlist = async () => {
      const response = await getWatchlist(token);
      setWatchlist(response.data);
    };
    fetchWatchlist();
  }, [token]);

  const handleAddStock = async () => {
    const response = await addStockToWatchlist(ticker, token);
    setWatchlist(response.data);
    setTicker('');
  };

  const handleRemoveStock = async (ticker) => {
    const response = await removeStockFromWatchlist(ticker, token);
    setWatchlist(response.data);
  };

  const handleNavigate = () => {
    navigate("/prices");
  }

  return (
    <div>
      <h2>Your Watchlist</h2>
      <p className='link' onClick={handleNavigate}>See watchlist stockes price</p>
      <input
        type="text"
        placeholder="Enter stock ticker"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
      />
      <button onClick={handleAddStock}>Add to Watchlist</button>
      <ul>
        {watchlist.map((stock) => (
          <li key={stock}>
            {stock} <button onClick={() => handleRemoveStock(stock)}>Remove</button>
          </li>
        ))}
      </ul>
      <style>
        {
          `
            .link{
              text-color:blue;
              text-decoration:underline;
              cursor:pointer;
            }
          `
        }
      </style>
    </div>
  );
}

export default Watchlist;