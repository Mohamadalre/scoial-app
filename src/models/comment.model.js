const mongoose = require('mongoose');

const comment = mongoose.Schema({

    content:{
        type:String,
        required:true
    },
    authorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required:true
    },


},{timestamps:true});

const comments = new mongoose.model('Comment',comment);

module.exports = comments