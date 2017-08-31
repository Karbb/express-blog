var express = require('express');
var router = express.Router();

// Require controller modules
var postController = require('../controllers/postController');

/* GET home page. */
router.get('/', postController.post_list);

/* GET request for creating Post. */
router.get('/post/create', postController.post_create_get);

/* POST request for creating Post. */
router.post('/post/create', postController.post_create_post);

/* GET request for one Book. */
router.get('/post/:id', postController.post_detail);

module.exports = router;
