import express from "express";
import { IndexRoutes } from "./app/routes/indexRoutes";
import passport from "./app/config/passport";
import cookieParser from "cookie-parser";



const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());  // passport middleware

app.get("/", (req, res) => {
  res.send("NooreFragrance Server Running...");
});

// all module routes
app.use("/api/v1", IndexRoutes);

export default app;