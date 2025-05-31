import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProject extends Document {
  title: string;
  category: string;
  priority: number;
  image: string;
  url: string;
}

const projectSchema: Schema<IProject> = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const Project: Model<IProject> = mongoose.model<IProject>(
  "Project",
  projectSchema
);

export default Project;
