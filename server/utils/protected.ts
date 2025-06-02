import { NextFunction, Request, Response } from "express";
// import passport from "../services/passport";
import dotenv from "dotenv";

import passport from "./passport";
import User from "../models/User";

dotenv.config();

export interface IUserProtected {
  userId: string;
}

export const protectedRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Token being verified:", req.headers.authorization);

  passport.authenticate(
    "jwt",
    { session: false },
    async (err: Error, user: any, info: any) => {
      console.log("user from protected", info);

      if (err) {
        return res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message });
      }

      if (!user) {
        return res
          .status(401)
          .json({ message: "Unauthorized: Invalid or missing token", info });
      }

      const loggedUser = await User.findById(user.userId).lean();

      // if (loggedUser && loggedUser.sessionToken !== req.headers.authorization?.split(" ")[1]) {
      //     return res.status(401).json({ message: "Session has expired. Please log in again." });
      // }

      req.user = user;
      next();
    }
  )(req, res, next);
};
