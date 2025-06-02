import express from "express";
import { protectedRoute } from "../utils/protected";
const adminController = require("../controllers/adminController");
const adminRoutes = express.Router();
adminRoutes
  .get("/get-projects", adminController.getProjects)
  .get("/details/:id", adminController.getProjectDetails)
  .post("/add-project", protectedRoute, adminController.addProject)
  .put("/update-project/:id", protectedRoute, adminController.updateProject)
  .delete("/delete-project/:id", protectedRoute, adminController.deleteProject);

export default adminRoutes;
