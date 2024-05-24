import { ZodSchema, z } from "zod";
import { AppError } from "../../app/errors/app-error";

export function validateSchema<Z extends ZodSchema>(schema: Z) {
  return (data: any) => {
    const result = schema.safeParse(data);

    if (!result.success) throw new AppError({ message: result.error.message, statusCode: 500 });

    return result.data as z.infer<Z>;
  };
}
