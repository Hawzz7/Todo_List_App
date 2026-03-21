import express from "express";
import {
  register,
  login,
  refreshToken,
  logout,
  getCurrentUser,
} from "../controllers/auth.Controller.js";

import verifyRefreshToken from "../middleware/verifyRefreshToken.js";
import verifyAccessToken from "../middleware/verifyAccessToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", verifyRefreshToken, refreshToken);
router.post("/logout", verifyRefreshToken, logout);
router.get("/user", verifyAccessToken, getCurrentUser);

export default router;