import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISkill extends Document {
  skill: string;
  image_url: string;
  priority: number;
  percentage?: string;
}

const skillSchema: Schema<ISkill> = new Schema({
  skill: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  percentage: {
    type: String,
  },
});

const Skill: Model<ISkill> = mongoose.model<ISkill>("Skill", skillSchema);

export default Skill;
