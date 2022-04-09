const express = require('express');
const { getPosts, createPosts,clearPosts,UpdatePosts } = require('../Controller/services');
const router = express.Router();

router.get('/', getPosts);
router.post('/', createPosts);
router.delete('/:range', clearPosts);
router.put('/:range', UpdatePosts);

module.exports = router;