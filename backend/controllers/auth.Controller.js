import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/tokenUtil.js";

// Controller for user registration
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = hashedRefreshToken;
    await user.save();

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        // secure: false,
        // sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        // secure: false,
        // sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(201)
      .json({
        success: true,
        message: "User registered successfully",
        user: { id: user._id, name: user.name, email: user.email },
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error registering user",
    });
  }
};

// Controller for user login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    user.refreshToken = hashedRefreshToken;
    await user.save();

    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        // secure: false,
        // sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        // secure: false,
        // sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({ success: true, message: "User logged in successfully", user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error logging in user",
    });
  }
};

// Controller for user logout
export const logout = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const user = await User.findById(decoded.id);

        if (user) {
          user.refreshToken = null;
          await user.save();
        }
      } catch (err) {
        // ignore invalid token
      }
    }

    res
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        // secure: false,
        // sameSite: "strict",
      })
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        // sameSite: "strict",
        // secure: false,
      })
      .status(200)
      .json({
        success: true,
        message: "User logged out successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error logging out user",
    });
  }
};

// Controller for refreshing access token
export const refreshToken = async (req, res) => {
  try {
    const user = req.user;
    const oldToken = req.refreshToken;

    if (!user.refreshToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const isMatch = await bcrypt.compare(oldToken, user.refreshToken);

    if (!isMatch) {
      user.refreshToken = null;
      await user.save();

      return res.status(403).json({ message: "Token reuse detected" });
    }

    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    const hashedNewToken = await bcrypt.hash(newRefreshToken, 10);
    user.refreshToken = hashedNewToken;
    await user.save();

    res
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        // sameSite: "strict",
        // secure: false,
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        // sameSite: "strict",
        // secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({ message: "Token refreshed successfully" });
  } catch (error) {
    res.status(401).json({
      success: false,
      error: error.message,
      message: "Invalid refresh token",
    });
  }
};

// Controller for getting current user info
export const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      message: "Error fetching user info",
    });
  }
};

