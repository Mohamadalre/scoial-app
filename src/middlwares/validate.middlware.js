const { validationResult } = require("express-validator");
// to check for problems with vaildation 
const validate = (req, res, next) => {
    try {
        const result = validationResult(req);

        if(!result.isEmpty()) {
            return res.status(400).json({
                "state":"Error",
                "message": result.array().map(e=> e.path+":"+e.msg),
                "data":null });
        }

        next();
    } catch (error) {
        return res.status(500).json({ erro: error.message });        
    }
}

module.exports = validate