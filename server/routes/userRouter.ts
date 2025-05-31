import express from "express";
import * as auth from "../controllers/userController";

const userRoutes = express.Router();
userRoutes
  .post("/sign-up", auth.register)
  .post("/sign-in", auth.login)
  .post("/sign-out", auth.logout);

export default userRoutes;
