import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const register = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Name, Email and Password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists. Please login." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken({ userId: user._id, role: user.role });
    res.status(201).json({
      message: "User registered successfully",
      result: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  }
);

// Login user with email + password
export const login = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken({ userId: user._id, role: user.role });

    res.status(200).json({
      message: "Login successful",
      result: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  }
);

// Logout user
export const logout = asyncHandler(async (_req: Request, res: Response) => {
  // Optionally clear cookies if you set tokens there
  res.status(200).json({ message: "Logout successful" });
});
