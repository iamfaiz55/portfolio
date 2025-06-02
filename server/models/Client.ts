import mongoose, { Schema, Document, Model } from "mongoose";

export interface IClient extends Document {
  name: string;
  email: string;
  mobile: number;
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
  mobile: {
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
