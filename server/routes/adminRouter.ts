import express from "express";
import { protectedRoute } from "../utils/protected";
const adminController = require("../controllers/adminController");
const adminRoutes = express.Router();
adminRoutes
  .get("/get-projects", adminController.getProjects)
  .post("/add-project", protectedRoute, adminController.addProject)
  .put("/update-project/:id", protectedRoute, adminController.updateProject)
  .delete("/delete-project/:id", protectedRoute, adminController.deleteProject)

  .get("/get-skills", adminController.getSkills)
  .post("/add-skill", protectedRoute, adminController.addSkill)
  .put("/update-skill/:id", protectedRoute, adminController.updateSkill)
  .delete("/delete-skill/:id", protectedRoute, adminController.deleteSkill);

export default adminRoutes;
