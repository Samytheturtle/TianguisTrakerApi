const jwt = require('jsonwebtoken');

require('dotenv').config();

function generateAccessToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '30m'});
}

function validateToken(req, res, next) {
    try {
        let accessToken = req.headers['authorization'] || req.headers['x-access-token']; 

        if(!accessToken){
            res.json({ message: "Access denied, token?" });
        }
        if(accessToken.startsWith('Bearer ')){
            accessToken = accessToken.slice(7, accessToken.lenght);
        }

        jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) =>{
            if(err){
                res.json({ message: "Access denied, token expired or incorrect" });
            }else{
                next();
            }
        })
    } catch (error) {
        res.status(418);
    }
    
}

module.exports = {
    generateAccessToken,
    validateToken
}