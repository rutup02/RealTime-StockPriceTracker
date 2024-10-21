const express = require('express');
const User = require('../model/user');
const auth = require('../middleware/auth');

const router = express.Router();

// Add to watchlist
router.post('/add', auth, async (req, res) => {
    const { ticker } = req.body;
    try {
        const user = await User.findById(req.user);
        if (!user.watchlist.includes(ticker)) {
            user.watchlist.push(ticker);
            await user.save();
        }
        res.json(user.watchlist);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Remove from watchlist
router.post('/remove', auth, async (req, res) => {
    const { ticker } = req.body;
    try {
        const user = await User.findById(req.user);
        user.watchlist = user.watchlist.filter(item => item !== ticker);
        await user.save();
        res.json(user.watchlist);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

// Get watchlist
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        res.json(user.watchlist);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

module.exports = router;
