import { describe, expect, it } from "vitest";
import { SearchUserUseCase } from "../../src/app/use-cases/search-user";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user.repository";
import { UploadFileUseCase } from "../../src/app/use-cases/upload-file";
import { csvToJsonConverterService } from "../../src/app/modules/file.module";
import { AppError } from "../../src/app/errors/app-error";
import { Readable } from "stream";
import { CsvToJsonConverterService } from "../../src/app/services/csv-to-json-converter.service";
import { CsvUsersDto } from "../../src/app/dtos/csv-user.dto";

describe("UploadFileUseCase", () => {
  it("should be defined", () => {
    expect(csvToJsonConverterService).toBeDefined();
    expect(csvToJsonConverterService).toBeInstanceOf(CsvToJsonConverterService);
  });

  it("should throw a error of converting process", async () => {
    const file = "name,city,country\nJohn Doe,New York,USA";

    expect(csvToJsonConverterService.convert(file, CsvUsersDto.validate)).rejects.toThrowError();
  });
});
