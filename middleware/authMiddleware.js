const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function(req, res, next) {
    if(req.method === "OPTIONS"){
        next();
    }

    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
           return res.status(403).json({message: "Користувач не авторизований"}) 
        }
        const decodetData = jwt.verify(token, secret)
    }catch(e){
        console.log(e)
        return res.status(400).json({message: "Користувач не авторизований"})        
    }
}