import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

const verifyRefreshToken = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "No refresh token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    req.refreshToken = token;

    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid refresh token" });
  }
};

export default verifyRefreshToken;
