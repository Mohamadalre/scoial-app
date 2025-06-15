const express = require('express');
const route = express.Router();
const user = require('../controllers/users.controller');
const {signupNewUserValidate,loginUserValidate} = require('../validation/users.validate');
const auth = require('../middlwares/auth.middleware')

route.post('/signup',[ ...signupNewUserValidate],user.singup);
route.post('/login',[ ...loginUserValidate],user.login);
route.post('/logout',[auth],user.logout);


module.exports = route
