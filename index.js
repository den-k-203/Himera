const express = require('express');
const mongoose = require('mongoose')
const authRouter = require('./authRouter')
const PORT = 5000;

const app = express();

app.use(express.json())
app.use('/auth', authRouter)

const main = async () => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        app.listen(PORT, () =>{
            console.log(`You start server on port ${PORT}`)    
        })  
    }catch(e){
        console.log(e);
    }
} 

main().catch(err => {console.log(err)})

