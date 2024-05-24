import { describe, expect, it } from "vitest";
import { SearchUserUseCase } from "../../src/app/use-cases/search-user";
import { InMemoryUserRepository } from "../repositories/in-memory/in-memory-user.repository";
import { UploadFileUseCase } from "../../src/app/use-cases/upload-file";
import { csvToJsonConverterService } from "../../src/app/modules/file.module";
import { AppError } from "../../src/app/errors/app-error";
import { Readable } from "stream";

describe("UploadFileUseCase", () => {
  const userRepository = new InMemoryUserRepository();

  const uploadFileUseCase = new UploadFileUseCase(userRepository, csvToJsonConverterService);

  it("should be defined", () => {
    expect(uploadFileUseCase).toBeDefined();
    expect(uploadFileUseCase).toBeInstanceOf(UploadFileUseCase);
  });

  it("should create users", async () => {
    const buffer = Buffer.from("name,city,country,favorite_sport\nJohn Doe,New York,USA,Basketball");

    const file: Express.Multer.File = {
      fieldname: "file",
      originalname: "test.csv",
      encoding: "7bit",
      mimetype: "text/csv",
      buffer: buffer,
      size: buffer.byteLength,
      destination: "",
      filename: "",
      path: "",
      stream: new Readable(),
    };

    const data = await uploadFileUseCase.execute({ file });

    expect(data).toHaveProperty("message");

    expect(data.message).toBe("The file was uploaded successfully.");

    const users = await userRepository.findAll();

    expect(users).toHaveLength(2);
  });

  it("should throw error of file not found", async () => {
    await expect(uploadFileUseCase.execute({})).rejects.toThrow(AppError);
  });

  // it("should not return data", async () => {
  //   const data = await uploadFileUseCase.execute({ term: "Lucass" });

  //   expect(data).toHaveProperty("data");

  //   expect(Array.isArray(data.data)).toBe(true);

  //   expect(data.data.length).toBe(0);
  // });
});
