import express from "express";
import cors from "cors";
import { IndexRoutes } from "./app/routes/indexRoutes";
import passport from "./app/config/passport";
import cookieParser from "cookie-parser";
import { notFound } from "./app/middlewares/notFount";

const app = express();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: [process.env.APP_URL || "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "stripe-signature",
      "Accept",
      "Origin",
      "X-Requested-With",
    ],
  }),
);
app.use(cookieParser());
app.use(passport.initialize());  // passport middleware

// Initial route
app.get("/", (req, res) => {
  res.send("NooreFragrance Server Running...");
});

// all module routes
app.use("/api/v1", IndexRoutes);

// not found
app.use(notFound);

export default app;