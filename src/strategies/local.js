const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require("../database/schemas/User")
const { comparePass } = require("../utils/helper")

passport.serializeUser((user,done)=>done(null,user.id))
passport.deserializeUser(async (id,done)=>{
    try{
        const user = await User.findById(id);
        if(!user) throw new Error("No such user found")
        else done(null,user);
    }catch(e){
        console.log(e);
        done(e,null)
    }
})


passport.use(
    new Strategy({
        usernameField: 'email',

    }, async (email, password, done) => {
        try{
            if (!email || !password) {
                throw new Error("Missing creds");
            }
            const userDb = await User.findOne({ email })
            if (!userDb) throw new Error("user not found");
            const isValid = comparePass(password, userDb.password)
            if (isValid) {
                done(null,userDb)
            } else {
                done(null,null)
            }
        }catch(err){
            // console.log(err);
            done(err,null)
        }
    })

);

