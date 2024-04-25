import express, { request, response } from "express";
import bodyParser from "body-parser";
import session from "express-session";
import sessionStore from "./configuration/mysql/dbCon.js";
import routes from "./routes/index.js";
import passport from "passport";
import "./strategies/local-strategies.js";

const app = express();
const port = 8080;

app.use(session(
    {
        secret:"practiceMore",
        saveUninitialized:false,
        resave:false,
        cookie:{
            maxAge:60000*60
        },
        // store: sessionStore
    }
    ));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

app.use(routes);
app.post(
    "/api/auth",
    passport.authenticate("local"), 
    (req,res)=>{
        res.send("Authentication successful");

});

app.get(
    "/api/auth/status",
    (req,res)=>{
        console.log(`Inside /auth/status endpoint`);
        console.log(req.user);
        console.log(req.session);
        res.send(req.user);
});

app.get("/api/auth/logout", (req,res)=>{
    if(!req.user) return res.sendStatus(401);

    req.logout((err)=>{
        if (err) return res.sendStatus(400);
        res.send(200);
    })
})

app.listen(port, console.log("running on port 8080"));