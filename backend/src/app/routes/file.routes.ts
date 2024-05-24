import { Router } from "express";
import multer from "multer";

import { fileController } from "../modules/file.module";
import { AppError } from "../errors/app-error";

const fileRoutes = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 1 },
  fileFilter(req, file, callback) {
    if (file.mimetype !== "text/csv")
      return callback(new AppError({ message: "Please upload a csv file", statusCode: 500 }));

    callback(null, true);
  },
});

fileRoutes.post("/", upload.single("file"), async (req, res) => fileController.uploadFile(req, res));

export { fileRoutes };
