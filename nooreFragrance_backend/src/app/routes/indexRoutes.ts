import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

router.get("/", (req, res) => {
  res.send("NoorEFragrance Server Running...");
});

// Auth Routes
router.use("/auth", AuthRoutes);


export const IndexRoutes = router;