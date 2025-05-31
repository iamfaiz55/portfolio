import express from "express";
import { contact } from "../controllers/clientController";
// import { register } from "../controllers/clientController";

const ClientRouter = express.Router();

ClientRouter.post("/send-email", contact);

export default ClientRouter;
