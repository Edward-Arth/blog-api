const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our api' });
});

router.post('/signup', user_controller.user_signup_post);

router.post('/login', user_controller.user_login_post);

router.get('/authors', user_controller.user_list_get);

router.post('/post', post_controller.blogpost_post);

module.exports = router;