import passport from "passport";
import { Strategy } from "passport-local";
import QueryLogin from "../mysqlQuery/userQueries/msql_query.js";

passport.serializeUser((user,done)=>{
    console.log("This is serializedUser")
    console.log(user)
    done(null,user.username);
});

passport.deserializeUser(async (username, done) => {
   
    try {
        console.log("This is deserializeUser");
        console.log(username);
        const findUser = await QueryLogin.findOne(username);
        if (!findUser) {
            throw new Error("User not found");
        }
        done(null, findUser);
    } catch (error) {
        done(error, null);
    }
});

export default passport.use(
    new Strategy({usernameField:"username"},async(username, password, done)=>{
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        try {
            const findUser = await QueryLogin.findOne(username);
            if(!findUser) throw new Error("User not found");
            if(findUser.password !== password) throw new Error("Invalid credentials");
            done(null,findUser);
        } catch (error) {
            done(error,null);
        }

    })
)