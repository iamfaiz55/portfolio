import express from "express";
import * as auth from "../controllers/userController";

const authRoutes = express.Router();
authRoutes
  .post("/sign-up", auth.register)
  .post("/sign-in", auth.login)
  .post("/sign-out", auth.logout);

export default authRoutes;
