import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import Project from "../models/Project";

import Skill from "../models/Skill";
import upload from "../utils/upload";
import cloudinary from "../utils/uploadConfig";

// Get all projects
export const getProjects = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const projects = await Project.find();
    res
      .status(200)
      .json({ message: "Projects Get Successfully", result: projects });
  }
);
export const getProjectDetails = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const project = await Project.findById(id);
    res
      .status(200)
      .json({ message: "Project Details Get Successfully", result: project });
  }
);

// Add a project
export const addProject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    upload(req, res, async (err: any) => {
      const { name, desc, tech, duration, link, shortDesc } = req.body;

      if (err) {
        return res.status(400).json({ message: err.message || "Upload error" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "Image is required" });
      }

      // Check for required fields
      if (!name || !desc || !tech || !duration || !link || !shortDesc) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const existingProject = await Project.findOne({ name });
      if (existingProject) {
        return res.status(400).json({ message: "Project already exists" });
      }

      const { secure_url } = await cloudinary.uploader.upload(req.file.path);

      await Project.create({
        name,
        desc,
        image: secure_url,
        tech: Array.isArray(tech)
          ? tech
          : tech.split(",").map((t: string) => t.trim()),
        duration,
        link,
        shortDesc,
      });

      res.status(200).json({ message: "Project added successfully" });
    });
  }
);

// Update a project
export const updateProject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    upload(req, res, async (err: any) => {
      const { id } = req.params;

      if (err) {
        return res
          .status(400)
          .json({ message: "File upload failed", error: err.message });
      }

      const project = await Project.findById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      let imageUrl = project.image;

      if (req.file) {
        try {
          const publicId = project.image.split("/").pop()?.split(".")[0];
          if (publicId) {
            await cloudinary.uploader.destroy(publicId);
          }

          const { secure_url } = await cloudinary.uploader.upload(
            req.file.path
          );
          imageUrl = secure_url;
        } catch (error: any) {
          return res.status(500).json({
            message: "Failed to upload new image",
            error: error.message,
          });
        }
      }

      const { name, desc, tech, duration, link, shortDesc } = req.body;

      await Project.findByIdAndUpdate(id, {
        name,
        shortDesc,
        desc,
        image: imageUrl,
        tech: Array.isArray(tech)
          ? tech
          : tech.split(",").map((t: string) => t.trim()),
        duration,
        link,
      });

      res.status(200).json({ message: "Project updated successfully" });
    });
  }
);

// Delete a project
export const deleteProject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.image) {
      const ImageId = project.image.split("/").pop()?.split(".")[0];
      if (ImageId) {
        await cloudinary.uploader.destroy(ImageId);
      }
    }

    await Project.findByIdAndDelete(id);
    res.status(200).json({ message: "Project Delete Successfully" });
  }
);
