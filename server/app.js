const dotenv= require("dotenv");
const express = require ('express');
const app = express();
const mongoose= require('mongoose');

dotenv.config({path:'./config.env'});

require('./db/conn');
// const User = require('./model/userSchema');

app.use(express.json());
//we link the router files to make our route easy
app.use(require('./Router/auth'));

const PORT=process.env.PORT || 5000;



//MiddleWare

const middleware=(req,res,next)=>{
console.log('this is middleware');
next();
}



app.get('/',(req, res)=>{
     res.send(`Hello world`);
});

app.get('/about',middleware,(req,res)=>{
    console.log('this is about');
    res.send('This is about me.');
})

app.get('/signin',(req,res)=>{
    res.send('This is login page');
})

app.get('/signup',(req,res)=>{
    res.send('This is registration page');
})

if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"));
    const path= require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html')
        );   
    })
}

app.listen(PORT,()=>{
    console.log(`server on running on port ${PORT}`)
});