const express = require("express");
const router = express.Router();
const user_controller = require("../controllers/userController");
const post_controller = require("../controllers/postController");
const comment_controller = require("../controllers/commentController");

router.get('/', function(req, res) {
    res.json({ message: 'Welcome to our api' });
});

router.post('/signup', user_controller.user_signup_post);

router.post('/login', user_controller.user_login_post);

router.get('/authors', user_controller.user_list_get);
router.get('/author/:id', user_controller.user_get);

router.post('/post', post_controller.blogpost_post);

router.get('/posts', post_controller.blogpost_list_get);

router.get('/post/:id', post_controller.blogpost_detail_get);
router.post('/post/:id/edit', post_controller.blogpost_edit);
router.post('/post/:id/delete', post_controller.blogpost_delete);
router.post('/post/:id/like', user_controller.user_likes_post);
router.post('/post/:id/unlike', user_controller.user_unlikes_post);
router.post('/post/:id/commPost', comment_controller.comment_post);

router.get('/likes', user_controller.user_likes_get);


module.exports = router;