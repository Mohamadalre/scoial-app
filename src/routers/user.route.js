const express = require('express');
const route = express.Router();
const user = require('../controllers/users.controller');
const {signupNewUserValidate,loginUserValidate,updateUserValidate} = require('../validation/users.validate');
const auth = require('../middlwares/auth.middleware');

route.get('/me',[auth],user.getMyProfile);
route.put('/me',[auth,...updateUserValidate],user.updateMyProfile);
route.delete('/me',[auth],user.deleteMyProfile);
module.exports = route