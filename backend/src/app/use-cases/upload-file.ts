import Papa from "papaparse";
import { IUseCase } from "../../core/contracts/use-case";
import { AppError } from "../errors/app-error";
import { UserRepository } from "../../domain/repositories/user.repository";
import { CsvUserFactory } from "../factories/csv-user.factory";
import { CsvToJsonConverterService } from "../services/csv-to-json-converter.service";
import { CsvUsersDto } from "../dtos/csv-user.dto";

type UploadFileInput = { file?: Express.Multer.File };
type UploadFileOutput = { message: string };

export class UploadFileUseCase implements IUseCase<UploadFileInput, UploadFileOutput> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly csvToJsonConverterService: CsvToJsonConverterService,
  ) {}

  async execute(input: UploadFileInput): Promise<UploadFileOutput> {
    if (!input.file) throw new AppError({ statusCode: 400, message: "File not found" });

    const csvTextContent = input.file.buffer.toString("utf-8");

    const convertedData = await this.csvToJsonConverterService.convert<CsvUsersDto.Type>(
      csvTextContent,
      CsvUsersDto.validate,
    );

    const data = convertedData.map((user) => CsvUserFactory.create(user));

    await this.userRepository.createMany(data);

    return { message: "The file was uploaded successfully." };
  }
}
