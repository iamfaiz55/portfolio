import mongoose, { Schema, Document, Model } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  phone: number;
  message: string;
}

const clientSchema: Schema<IClient> = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const Client: Model<IClient> = mongoose.model<IClient>("Client", clientSchema);

export default Client;
