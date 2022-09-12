const passport = require('passport');
const { Strategy } = require('passport-discord');
const DiscordUser = require("../database/schemas/DiscordUser")
// const { comparePass } = require("../utils/helper")
require('dotenv').config()

passport.serializeUser((user,done)=>done(null,user.id))
passport.deserializeUser(async (id,done)=>{
    try{
        const user = await DiscordUser.findById(id);
        if(!user) throw new Error("No such user found")
        else done(null,user);
    }catch(e){
        console.log(e);
        done(e,null)
    }
})

passport.use(new Strategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSECRET,
    callbackURL: 'http://localhost:3333/api/auth/discord/redirect',
    scope: ['identify'],
},async(accessToken, refreshToken, profile, done)=>{
    try{
        console.log(accessToken,refreshToken);
        console.log(profile);
        const discordUser = await DiscordUser.findOne({discordId:profile.id})
        if(discordUser){
            return done(null, discordUser);
        }else{
            const newUser = await DiscordUser.create({discordId: profile.id})
            return done(null,newUser);
        }
    }catch(e){
        console.log(e);
        return done(e,null)
    }
})
);