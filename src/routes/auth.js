const {Router} = require('express');
const passport = require("passport");
const User = require("../database/schemas/User")
const {hashPass,comparePass} = require("../utils/helper")

const router = Router()

// router.post('/login',async (req,res)=>{
//     const {email,password} = req.body;
//     if(!email || !password) return res.sendStatus(400);
//     const userDb = await User.findOne({email})
//     if(!userDb) return res.sendStatus(401);
//     const isValid = comparePass(password,userDb.password)
//     if(isValid){
//         req.session.user = userDb;
//         return res.sendStatus(200);
//     }else{
//         return res.sendStatus(401);
//     }
// })

router.post("/login",passport.authenticate('local'),(req,res)=>{return res.sendStatus(200)});

router.post('/register',async (req,res)=>{
    const {email} = req.body;
    const userDB = await User.findOne({email})
    if(userDB){
        res.status(400).send({msg: "User already exist!"})
    }else{
        const password = hashPass(req.body.password);
        const newUser = await User.create({password,email})
        newUser.save();
        res.sendStatus(201)
    }
})

router.get('/discord',passport.authenticate('discord'),(req,res)=>{return res.sendStatus(200)})

router.get('/discord/redirect',passport.authenticate('discord'),(req,res)=>{return res.sendStatus(200)})

module.exports = router;