const user = require('../models/user.model');
const comment = require('../models/comment.model');
const post = require('../models/post.model');
const help = require('../helper/createToken');
const {hash,verify}=require('../helper/hashing')

class  users {
// create account
singup = async(req,res)=>{
   try{ 
    const {username,email,password} = req.body;
    

    
    const users = new user({
        username
        ,email
        ,password
    });

    const userInfo = await users.save();
  const token = help.createToken({ id: userInfo._id, email: userInfo.email });

    return res.status(200).json({
        "state":"Success",
        "message":"Account created",
        "data":userInfo,
        "token":token
    })

}catch(erro){
    return res.status(400).json({
        "state":"Error",
        "message":erro.message,
        "data":null
    });
}
}

// login in account
    login = async (req, res) => {
        try {
            const { email, password } = req.body;

         

            const isEmail = await user.findOne({ email });

            if(!await verify(password, isEmail.password)) {
                return res.status(400).json({ message: "Your data is wrong" })
            }
            
            const token = help.createToken({ 
                id: isEmail._id, 
                email: isEmail.email,
            
            });

            return res.status(200).json({ 
                "state":"Success",
                "message":"Logged in successfully",
                "data":isEmail,
                "token":token
             });
        } catch (error) {
            return res.status(500).json({        
                "state":"Error",
                "message":error.message,
                 })
        }
    }

        logout = async (req, res) => {
        try {
            return res.status(200).json({
                 "state":"Success", 
                 "message": "Logged in successfully" })
        } catch (error) {
            return res.status(500).json({ 
                "state":"Error",
                "message": error.message })
        }
    }

    //fetch profile user
    getMyProfile =  async (req, res) => {
        try {
            const id = req.id;
            const myprofile = await user.findById(id);
            return res.status(200).json({
                state:"Success", 
                message: "Your account information has been successfully brought in",
                "data":myprofile })
                 
        } catch (error) {
            return res.status(500).json({ 
                state:"Error",
                message: error.message,
            
            })
        }
    }
// update account
    updateMyProfile =  async (req, res) => {
        try {
            const id = req.id;
            const {username,email,password} = req.body;
            
            const myprofile = await user.findByIdAndUpdate(id,{username,email,password:await hash(password)},{new:true});
            return res.status(200).json({
                state:"Success", 
                message: "Updated Account information successfully",
                data:myprofile })
                 
        } catch (error) {
            return res.status(500).json({ 
                state:"Error",
                message: error.message,
            
            })
        }
    }
    //delete account
    deleteMyProfile =  async (req, res) => {
        try {
            const id = req.id;
            const myprofile = await user.findByIdAndDelete(id);
            await post.deleteMany({authorId:id});
             await comment.deleteMany({authorId:id});
            return res.status(200).json({
                state:"Success", 
                message: "Deleted Account successfully",
                data:myprofile })
                 
        } catch (error) {
            return res.status(500).json({ 
                state:"Error",
                message: error.message,
            
            })
        }
    }


  
}

module.exports = new users();