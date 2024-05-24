import Papa from "papaparse";
import { validateSchema } from "../../utils/helpers/validate-schema";
import { AppError } from "../errors/app-error";

export class CsvToJsonConverterService {
  constructor(private parser: typeof Papa) {}

  convert<T>(csvTextContent: string, validator?: ReturnType<typeof validateSchema>) {
    return new Promise<T>((resolve, reject) => {
      try {
        this.parser.parse(csvTextContent, {
          header: true,
          complete: (results) => {
            if (validator) validator(results.data);
            resolve(results.data as T);
          },
          error: (error: any) => reject(error),
        });
      } catch (error) {
        throw new AppError({
          statusCode: 500,
          message:
            "An error occurred while parsing the CSV file, the file must contain valid data(name, city, country, favorite_sport).",
        });
      }
    });
  }
}
