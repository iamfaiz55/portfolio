import multer, { StorageEngine } from "multer";
import path from "path";
import { Request } from "express";

// Define storage engine
const postStorage: StorageEngine = multer.diskStorage({
  filename: (req: Request, file, cb) => {
    const fileName = Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  },
});

// Export middleware
const upload = multer({ storage: postStorage }).single("image");

export default upload;
