const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");


router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our api' });
});

router.post('/signup', user_controller.user_signup_post);

module.exports = router;