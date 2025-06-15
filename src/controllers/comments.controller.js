const user = require('../models/user.model');
const post = require('../models/post.model');
const comment = require('../models/comment.model');
const help = require('../helper/createToken');
const {hash,verify}=require('../helper/hashing');
const { populate } = require('dotenv');
const { findById } = require('d:/event system/Event system/models/userModels');

class comments{
    // create comment on a post
creatComment = async(req,res)=>{
   try{ 
    const {content,postId} = req.body;
    

    
    const commets = new comment({
    
        content,
        postId,
        authorId:req.id,

       
    });

    const commentInfo = await commets.save();
    const Post = await post.findById(postId);
    Post.comments.push(commentInfo._id);
    await Post.save();
 
    return res.status(200).json({
        state:"Success",
        message:" Created comment successfully",
        data:commentInfo,
      
    })

}catch(erro){
    return res.status(400).json({
        "state":"Error",
        "message":erro.message,
        "data":null
    });
}}


// fdtch comments  for  specific post
getComments = async(req,res)=>{
   try{ 
        const id = req.params.postId;
        const Post = await post.find({_id:id}).populate({path:'comments',select:['content','authorId','createdAt','updatedAt']});
        if(!Post){
            return res.status(400).json({
             state:"Error",
             message:"Post not found ",
             data:null
    });
    }
    // const comments = await comment.find({postId:id});
    return res.status(200).json({
        state:"Success",
        message:" get comments successfully",
        data:Post,
      
    })

}catch(erro){
    return res.status(400).json({
        "state":"Error",
        "message":erro.message,
        "data":null
    });
}}
// delete comment
deleteComment = async(req,res)=>{
 try{
    const id = req.params.id;
    const isExist = await comment.findById(id);

    if(!isExist){ 
        return res.status(400).json({
        state:"Error",
        message:"comment not found",
        data:null,
      
    });}
    
    
    if(isExist.authorId != req.id){
        return res.status(403).json({
        state:"Error",
        message:"You do not have permission",
        data:null
    });}

    
    const comments = await comment.findByIdAndDelete(id);
  
    

 
    return res.status(200).json({
        state:"Success",
        message:"Deleted  Post successfully ",
        data:comments,
      
    });
    }catch(erro){
         return res.status(400).json({
        "state":"Error",
        "message":erro.message,
        "data":null
    });
    }}
}

module.exports = new comments();