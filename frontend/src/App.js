import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth";
import Watchlist from "./components/Watchlist";
import StockPrices from "./components/StockPrices";

function App() {
   const [token, setToken] = useState(localStorage.getItem("token") || "");

   const [watchlist, setWatchlist] = useState([]);
   const saveToken = (token) => {
      localStorage.setItem("token", token);
      setToken(token);
   };

   return (
      <Router>
         <div className="App">
            {!token ? (
               <Auth setToken={saveToken} />
            ) : (
               <>
                  <Routes>
                     <Route path="/" element={<Watchlist token={token} watchlist={watchlist} setWatchlist={setWatchlist}/>} />
                     <Route
                        path="/prices"
                        element={<StockPrices token={token} watchlist={watchlist} setWatchlist={setWatchlist}/>}
                     />
                  </Routes>
               </>
            )}
         </div>
      </Router>
   );
}

export default App;
