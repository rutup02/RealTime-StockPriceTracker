const express = require('express');
const axios = require('axios');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/prices', auth, async (req, res) => {
    const { tickers } = req.query;
    try {
        const promises = tickers.split(',').map(ticker =>
            axios.get(`https://www.alphavantage.co/query`, {
                params: {
                    function: 'TIME_SERIES_INTRADAY',
                    symbol: ticker,
                    interval: '1min',
                    apikey: process.env.ALPHA_VANTAGE_API_KEY
                }
            })
        );
        const responses = await Promise.all(promises);
        const prices = responses.map(response => response.data);
        res.json(prices);
    } catch (error) {
        res.status(500).send('Error fetching stock prices');
    }
});

module.exports = router;
