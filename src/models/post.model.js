const mongoose = require('mongoose');

const post =  mongoose.Schema({
    title:{
        type:String,
        required :true,
    },
    content:{
        type:String,
        required:true
    },
    authorId:{//
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        
    }],
    comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Comment'
    }],

},{timestamps:true});

post.statics.paginate = async function(page , limit = 2, sort = '-createdAt') {
    const skip = (page - 1) * limit;
    const data = await this.find().skip(skip).limit(limit).sort(sort);
    const total = await this.countDocuments();
    return { users: data, total, currentpage:page, pages: Math.ceil(total / limit) };
};
const posts = new mongoose.model('Post',post);

module.exports = posts