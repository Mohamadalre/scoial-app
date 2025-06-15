const express = require('express');
const route = express.Router();
const Comment= require('../controllers/comments.controller');
const {CreateCommentValidate} = require('../validation/post.validate');
const auth = require('../middlwares/auth.middleware');

route.post('',[auth,...CreateCommentValidate],Comment.creatComment);
route.get('/:postId',[auth],Comment.getComments);
route.delete('/:id',[auth],Comment.deleteComment);
module.exports = route