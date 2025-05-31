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

// Add a project
export const addProject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    upload(req, res, async (err: any) => {
      const { title } = req.body;

      const project = await Project.findOne({ title });
      if (project) {
        return res.status(400).json({ message: "Project Already Exist" });
      }

      if (err) {
        return res.status(400).json({ message: err.message || "Upload error" });
      }
      if (!req.file) {
        return res.status(400).json({ message: "images is get added" });
      }
      const { secure_url } = await cloudinary.uploader.upload(req.file.path);
      await Project.create({ ...req.body, image: secure_url });

      res.status(200).json({ message: "Project Add Successfully" });
    });
  }
);

// Update a project
export const updateProject = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    upload(req, res, async (err: any) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "File upload failed", error: err.message });
      }

      const { id } = req.params;
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

      await Project.findByIdAndUpdate(id, { ...req.body, image: imageUrl });
      res.status(200).json({ message: "Project Update Successfully" });
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

// Get skills
export const getSkills = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const skills = await Skill.find().sort({ priority: 1 });
    res
      .status(200)
      .json({ message: "Skills Get Successfully", result: skills });
  }
);

// Add skill
export const addSkill = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { skill } = req.body;

    const isExist = await Skill.findOne({ skill });
    if (isExist) {
      return res.status(400).json({ message: "Skill already exist" });
    }

    await Skill.create(req.body);
    res.status(200).json({ message: "Skill Add Successfully" });
  }
);

// Update skill
export const updateSkill = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    await Skill.findByIdAndUpdate(id, req.body);
    res.status(200).json({ message: "Skill Update Successfully" });
  }
);

// Delete skill
export const deleteSkill = asyncHandler(
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;
    await Skill.findByIdAndDelete(id);
    res.status(200).json({ message: "Skill Delete Successfully" });
  }
);
