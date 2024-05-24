import { Request, Response } from "express";
import { UploadFileUseCase } from "../use-cases/upload-file";

export class FileController {
  constructor(private readonly uploadFileUseCase: UploadFileUseCase) {}

  async uploadFile(req: Request, res: Response) {
    const data = await this.uploadFileUseCase.execute({ file: req.file });

    return res.status(200).json(data);
  }
}
