import express from "express";
import { IndexRoutes } from "./app/routes/indexRoutes";
import passport from "./app/config/passport";
import session from "express-session";


const app = express();

app.use(express.json());


app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());


// all module routes
app.use("/api/v1", IndexRoutes);

export default app;