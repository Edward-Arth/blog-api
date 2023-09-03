const express = require("express");
const router = express.Router();

router.get('/api', function(req, res) {
    res.json({ message: 'Welcome to our api' });
});

module.exports = router;