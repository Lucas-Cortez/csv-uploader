import { z } from "zod";
import { validateSchema } from "../../utils/helpers/validate-schema";

export namespace SearchUserDto {
  export const schema = z.object({
    term: z.string().optional(),
  });

  export const validate = validateSchema(schema);

  export type Type = z.infer<typeof schema>;
}
