const user = require("../models/user.model");
const comment = require("../models/comment.model");
const post = require("../models/post.model");
const help = require("../helper/createToken");
const { hash, verify } = require("../helper/hashing");
const { populate } = require("dotenv");
const { check } = require("express-validator");

class posts {
    /// creat post 
    createPost = async (req, res) => {
        try {
            const { title, content } = req.body;

            const posts = new post({
                title,
                content,
                authorId: req.id,
            });

            const postInfo = await posts.save();

            return res.status(200).json({
                state: "Success",
                message: " Created Post successfully",
                data: postInfo,
            });
        } catch (erro) {
            return res.status(400).json({
                state: "Error",
                message: erro.message,
                data: null,
            });
        }
    };
///update post by  id post
    updatePost = async (req, res) => {
        try {
            const { title, content } = req.body;
            const id = req.params.id;
            const isExist = await post.findById(id);

            if (!isExist) {
                return res.status(400).json({
                    state: "Error",
                    message: "post not found",
                    data: null,
                });
            }

            if (isExist.authorId != req.id) {
                return res.status(403).json({
                    state: "Error",
                    message: "You do not have permission",
                    data: null,
                });
            }

            const posts = await post.findByIdAndUpdate(
                id,
                { title, content },
                { new: true }
            );

            return res.status(200).json({
                state: "Success",
                message: "Updated Post successfully ",
                data: posts,
            });
        } catch (erro) {
            return res.status(400).json({
                state: "Error",
                message: erro.message,
                data: null,
            });
        }
    };
    // delete post by id
    deletePost = async (req, res) => {
        try {
            const id = req.params.id;
            const isExist = await post.findById(id);

            if (!isExist) {
                return res.status(400).json({
                    state: "Error",
                    message: "post not found",
                    data: null,
                });
            }

            if (isExist.authorId != req.id) {
                return res.status(403).json({
                    state: "Error",
                    message: "You do not have permission",
                    data: null,
                });
            }

            const posts = await post.findByIdAndDelete(id);

            return res.status(200).json({
                state: "Success",
                message: "Deleted  Post successfully ",
                data: posts,
            });
        } catch (erro) {
            return res.status(400).json({
                state: "Error",
                message: erro.message,
                data: null,
            });
        }
    };

    //  fetch user posts 
    getMyPosts = async (req, res) => {
        try {
            const authorId = req.id;
            const posts = await post
                .find({ authorId: authorId })
                .populate({ path: "authorId", select: "username" });

            return res.status(200).json({
                state: "Success",
                message: "Bring yourPosts successfully ",
                data: posts,
            });
        } catch (erro) {
            return res.status(400).json({
                state: "Error",
                message: erro.message,
                data: null,
            });
        }
    };
//fetch All posts
    getAllPosts = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const posts = await post.paginate(page);

            return res.status(200).json({
                state: "Success",
                message: "Bring AllPosts successfully ",
                data: posts,
            });
        } catch (erro) {
            return res.status(400).json({
                state: "Error",
                message: erro.message,
                data: null,
            });
        }
    };
// fetch post by id post
    getPostById = async (req, res) => {
        try {
            const id = req.params.id;
            const posts = await post.findById(id);
            if (!posts) {
                return res.status(400).json({
                    state: "Error",
                    message: "Id invalid ",
                    data: null,
                });
            }
            return res.status(200).json({
                state: "Success",
                message: "Post details have been successfully brought ",
                data: posts,
            });
        } catch (erro) {
            return res.status(400).json({
                state: "Error",
                message: erro.message,
                data: null,
            });
        }
    };
// like a post
    addLike = async (req, res) => {
        try {
            const postId = req.params.postId;


            const isExist = await post.findById(postId);


            if (!isExist) {
                return res.status(400).json({
                    state: "Error",
                    message: "post not found",
                    data: null,
                });
            }
            const checked = isExist.likes.find(e => e == req.id);


            if (!checked) {
                isExist.likes.push(req.id);
                const info = await isExist.save();
                return res.status(200).json({
                    state: "Success",
                    message: " You added like to the post successfully",
                    data: info,
                });
            } else {
                return res.status(400).json({
                    state: "Error",
                    message: " You can not add like again!",
                    data: null,
                });
            }
        } catch (erro) {
            return res.status(400).json({
                state: "Error",
                message: erro.message,
                data: null,
            });
        }
    };
//delete likes
    deleteLike = async (req, res) => {
        try {
            const postId = req.params.postId;


            const isExist = await post.findById(postId);


            if (!isExist) {
                return res.status(400).json({
                    state: "Error",
                    message: "post not found",
                    data: null,
                });
            }
            const checked = isExist.likes.find(e => e == req.id);


            if (checked) {
                isExist.likes.pop(req.id);
                const info = await isExist.save();
                return res.status(200).json({
                    state: "Success",
                    message: " You deleted like to the post successfully",
                    data: info,
                });
            } else {
                return res.status(400).json({
                    state: "Error",
                    message: " You do not add like to the post!",
                    data: null,
                });
            }
        } catch (erro) {
            return res.status(400).json({
                state: "Error",
                message: erro.message,
                data: null,
            });
        }
    };
    // delete posts ower user and delete comments
    deleteMyPost = async (req, res) => {
        try {
            const posts = await post.find({ authorId: req.id });

            await comment.deleteMany({ postId: { $in: posts._id } });
            await post.deleteMany({ authorId: req.id });

            return res.status(200).json({
                state: "Success",
                message: "Deleted  MyPosts successfully ",
                data: posts,
            });
        } catch (erro) {
            return res.status(400).json({
                state: "Error",
                message: erro.message,
                data: null,
            });
        }
    };
    reset = async (req, res) => {
        try {

            const posts = await post.find({ authorId: req.id }).distinct("_id");
            await comment.deleteMany({ authorId: req.id });
            await comment.deleteMany({ postId: { $in: posts } });
            await post.deleteMany({ authorId: req.id });




            return res.status(200).json({
                state: "Success",
                message: "reset  Account successfully",
            })

        } catch (error) {
            return res.status(500).json({
                state: "Error",
                message: error.message,

            })
        }
    }

}

module.exports = new posts();
