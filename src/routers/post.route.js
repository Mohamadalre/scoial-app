const express = require('express');
const route = express.Router();
const Post = require('../controllers/posts.controller');
const {CreatePostValidate,UpdatePostValidate} = require('../validation/post.validate');
const auth = require('../middlwares/auth.middleware');

route.post('',[auth,...CreatePostValidate],Post.createPost);
route.get('',[auth],Post.getAllPosts);
route.get('/me',[auth],Post.getMyPosts);
route.put('/reset',[auth],Post.reset);
route.get('/:id',[auth],Post.getPostById);
route.put('/:id',[auth,...UpdatePostValidate],Post.updatePost);
route.delete('/:id',[auth],Post.deletePost);
route.delete('',[auth],Post.deleteMyPost);
route.post('/likes/:postId',[auth],Post.addLike);
route.delete('/likes/:postId',[auth],Post.deleteLike);

module.exports = route