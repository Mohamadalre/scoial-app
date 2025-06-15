const mongoose = require('mongoose');
const {hash:hashing} = require('../helper/hashing')

const user =  mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    
    },

    password:{
        type:String,
        required:true,
        min:8,
        max:12
    }


},{timestamps:true});
user.pre('save', async function(next) {
    if(this.isNew) {
        if(this.isModified('password')) {
            const hash = await hashing(this.password);

            this.password = hash;
        }
    }
    next();
});

const users = new mongoose.model('User',user);
module.exports = users