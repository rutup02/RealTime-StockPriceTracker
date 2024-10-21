import React, { useState, useEffect } from "react";
import { getStockPrices, getWatchlist } from "../services/api";
import { useNavigate } from "react-router-dom";

function StockPrices({ token }) {
   const [prices, setPrices] = useState([]);
   const [watchlist, setWatchlist] = useState([]);
   const navigate = useNavigate();
   useEffect(() => {
      const fetchWatchlist = async () => {
         const response = await getWatchlist(token);
         setWatchlist(response.data);
      };
      fetchWatchlist();
   }, [token]);

   useEffect(() => {
      if (watchlist?.length > 0) {
         const fetchPrices = async () => {
            const response = await getStockPrices(watchlist, token);
            setPrices(response.data);
         };
         fetchPrices();
      }
   }, [watchlist, token]);

   const handleNavigate = () => {
      navigate(-1);
   };
   return (
      <div>
         <p className="link" onClick={handleNavigate}>Back</p>
         <h2>Stock Prices</h2>
         <ul>
            {prices.map((priceData, index) => (
               <li key={index}>
                  {/* Extract and display relevant price info */}
                  {JSON.stringify(priceData)}
               </li>
            ))}
         </ul>
         <style>
            {`
            .link{
              text-color:blue;
              text-decoration:underline;
              cursor:pointer;
            }
          `}
         </style>
      </div>
   );
}

export default StockPrices;
