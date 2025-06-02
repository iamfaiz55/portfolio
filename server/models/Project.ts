import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  name: string;
  image: string;
  link: string;
  desc: string;
  shortDesc: string;
  tech: string[]; // Array of technologies
  duration: string; // Time duration to complete the project
}

const projectSchema: Schema<IProject> = new Schema({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  tech: {
    type: [String], // Array of technologies like ["React", "Node.js"]
    required: true,
  },
  duration: {
    type: String, // e.g., "3 weeks", "2 months"
    required: true,
  },
});

const Project: Model<IProject> = mongoose.model<IProject>(
  "Project",
  projectSchema
);

export default Project;
