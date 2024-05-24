import { z } from "zod";
import { validateSchema } from "../../utils/helpers/validate-schema";

export namespace CsvUsersDto {
  export const schema = z.array(
    z.object({
      name: z.string(),
      city: z.string(),
      country: z.string(),
      favorite_sport: z.string(),
    }),
  );

  export const validate = validateSchema(schema);

  export type Type = z.infer<typeof schema>;
}
