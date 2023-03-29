const User = require("./models/User")
const Role = require("./models/Role")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')
const { json } = require("express")

const generateAccessToken = (id, roles) => {
    const payload = {
        id, roles
    }

    return jwt.sign(payload, secret, {expiresIn:"10h"})
}

class authController{
    async registration(req, res){
        try{
            const {username, password} = req.body
            console.log(req.body)
            const candidate = await User.findOne({username})
            if(candidate){
                return res.status(400).json({message: "Користувач з таким ім`ям вже існує!"})
            }
            const hashPassword = bcrypt.hashSync(String(password), 7);
            const userRole = await Role.findOne({value:"USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]});
            await user.save()
            return res.json({message: "Користувач успішно зареєстрований!"})
        }catch(e){
            console.log(e);
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res){
        try{
           const {username, password} = req.body;
           const user = await User.findOne({username})
           if(!user){
            return res.status(400).json({message:"Користувача з таким ім`ям не існує!"})
           } 
           const validPassword = bcrypt.compareSync(password, user.password);
           if(!validPassword){
            return res.status(400).json({message:"Пароль невірний!"})
           }
           const token = generateAccessToken(user.id, user.roles);
           return res.json({token})  
        }catch(e){
            console.log(e);
            res.status(400).json({message: "Login error"})  
        }
    }

    async getUser(req, res){
        try{
          const users = await User.find()
          res.json(users)
        }catch(e){
            console.log(e);
            res.status(400).json({message: "Users error"})  
        }
    }
}

module.exports = new authController();