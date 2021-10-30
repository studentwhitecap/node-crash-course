// blog routes

const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController.js');

router.get('/', blogController.blog_index);
router.get('/create', blogController.blog_create_get);
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_get);
router.delete('/:id', blogController.blog_delete);

//router.get('/update-blog', blogController.blog_update);

module.exports = router;