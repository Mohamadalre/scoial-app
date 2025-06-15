require('dotenv').config();
const jwt = require('jsonwebtoken');
class help{
    // create token
 createToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY ,{ expiresIn: "1h" });
}

}
module.exports = new help();

