const express= require ('express');
const router = express.Router();
require('../db/conn');
const User = require("../model/userSchema");
const bcrypt=require("bcryptjs");
const jwt = require('jsonwebtoken');


router.get('/',(req,res)=>{
    res.send(`hello world from the server router js`);
}); 
// router.post('/register',(req,res)=>{

//     const {name, email, phone, work, password, Cpassword}=req.body;

//     if(!name || !email || !phone || !work || !password || !Cpassword){
//         return res.status(422).json({error:"please fill all the field properly"})
//     }
//    User.findOne({email:email})
//    .then((userExist)=>{
//        if(userExist){
//            return res.status(422).json({ error: "Email already Exist"});
//        }

//        const user = new User({name, email, phone, work, password, Cpassword})

//        user.save().then(()=>{
//            res.status(201).json({message: "user registerd successfully"});
//        }).catch((err) => res.status(500).json({error:"Failed to register"}));
//    }).catch(err => {console.log(err);});
// })

router.post('/register', async (req,res)=>{

    const {name, email, phone, work, password, Cpassword}=req.body;

    if(!name || !email || !phone || !work || !password || !Cpassword){
        return res.status(422).json({error:"please fill all the field properly"})
    }
    try{

        const userExist= await User.findOne({email:email});

        if (userExist){
            return res.status(422).json({error:"email already exist"});
        } else if(password != Cpassword){
            return res.status(422).json({error:"password is not matching"})
        } else{
            const user= new User({name, email, phone, work, password, Cpassword});

             await user.save();

             res.status(201).json({message:"user registerd successfully"});
        }

       

    } catch(err){
        console.log(err);
    }
});
 
//login route

router.post('/signin', async (req,res)=>{
try{
    const {email,password}= req.body;
    if(!email || !password){
        return res.status(400).json({error:"please fill the data properly"})
    }

    const userLogin = await User.findOne({email:email});
    console.log(userLogin);

    if(userLogin){
        const isMatch = await bcrypt.compare(password, userLogin.password);
        const token = await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("jwtoken",token,{
            expires:new Date(Date.now() + 25892000000),
            httpOnly:true
        });
       
        if(!isMatch){
            res.status(400).json({message:"Invalid Credientials"});
        }else{
            res.json({message:"user Signin Successfully"})
        }
    }else{
        res.status(400).json({message:"Invalid Credientials"});
    }
     
    
    

}catch(err){
    console.log(err);
}
})




module.exports=router;