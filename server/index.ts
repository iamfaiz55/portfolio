import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ClientRouter from "./routes/clientRouter";
// import userRoutes from "./routes/authRouter";
import adminRoutes from "./routes/adminRouter";
import authRoutes from "./routes/authRouter";
// import cookieParser from "cookie-parser";

// import clientRoutes from "./routes/clientRouter";
// import userRoutes from "./routes/userRouter";
// import adminRoutes from "./routes/adminRouter";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/client", ClientRouter);
app.use("/api/auth", authRoutes);
app.use("/api/project", adminRoutes);

// 404 route
app.use("*", (_req: Request, res: Response): any => {
  return res.status(404).json({ message: "Resource Not Found" });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  res.status(500).json({ message: err.message || "Something went wrong" });
});

// MongoDB connection and server start
mongoose
  .connect(process.env.MONGO_URL as string)
  .then(() => {
    console.log("DB CONNECTED");
    app.listen(process.env.PORT || 5000, () =>
      console.log(`SERVER RUNNING on port ${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
