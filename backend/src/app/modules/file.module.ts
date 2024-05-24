import { FileController } from "../controllers/file.controller";
import { CsvToJsonConverterService } from "../services/csv-to-json-converter.service";
import { UploadFileUseCase } from "../use-cases/upload-file";
import { userRepository } from "./user.module";
import Papa from "papaparse";

const csvToJsonConverterService = new CsvToJsonConverterService(Papa);

const uploadFileUseCase = new UploadFileUseCase(userRepository, csvToJsonConverterService);

const fileController = new FileController(uploadFileUseCase);

export { fileController, uploadFileUseCase, csvToJsonConverterService };
