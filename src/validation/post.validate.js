const { body } = require("express-validator");
const validate = require("../middlwares/validate.middlware");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const {hash} = require('../helper/hashing')

const CreatePostValidate = [
    body("title").isString()
    ,
    body("content").isString()
    ,
    
    validate
];

const UpdatePostValidate = [
    body("title").isString().optional()
    ,
    body("content").isString().optional()
    ,
    
    validate
];
const CreateCommentValidate = [
    body("postId").isMongoId().withMessage('Invalid post id format').custom(async (value) =>{
        const isExist = await Post.findById(value);
        if(!isExist){
              throw new Error("Post not found ")
        }

    })
    ,
    body("content").isString()
    ,
    
    validate
];



module.exports = {
CreatePostValidate,
UpdatePostValidate,
CreateCommentValidate

}