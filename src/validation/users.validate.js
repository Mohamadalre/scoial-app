const { body } = require("express-validator");
const validate = require("../middlwares/validate.middlware");
const User = require("../models/user.model");
const {hash} = require('../helper/hashing')

const signupNewUserValidate = [
    body("username").isString()
    ,

    body("password")
        .isString().withMessage("Invalid password")
        .isLength({ min: 8,max:12}).withMessage("Passowrd must be at least 8 charachter and most 12 charachter "),

    body("email")
        .isEmail()
        .custom(async (value) => {
            const isEmail = await User.findOne({ email: value });
            
            if(isEmail) {
                throw new Error("Your email is already exist")
            }

            return true;
        }),
        
    validate
];



const loginUserValidate = [
    body("password")
        .isString().withMessage("Invalid password or email")
        .isLength({ min: 8,max:12}).withMessage("Passowrd must be at least 8 charachter and most 12 charachter "),

    body("email")
        .isEmail()
        .custom(async (value) => {
            const isEmail = await User.findOne({ email: value });
            
            if(!isEmail) {
                throw new Error("Your email is not exist")
            }

            return true;
        }),
        
    validate
];

const updateUserValidate = [
    body("username").isString().optional()
    ,

    body("password")
        .isString().withMessage("Invalid password")
        .isLength({ min: 8,max:12}).withMessage("Passowrd must be at least 8 charachter and most 12 charachter ").optional(),

    body("email")
        .isEmail()
        .custom(async (value) => {
            const isEmail = await User.findOne({ email: value });
            
            if(isEmail) {
                throw new Error("Your email is already exist")
            }
           

            return true;
        }).optional(),
        
    validate
];


module.exports = {
    signupNewUserValidate,
    loginUserValidate,
    updateUserValidate

}