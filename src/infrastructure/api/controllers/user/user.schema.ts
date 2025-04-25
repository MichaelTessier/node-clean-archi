import { z } from "zod";

export const PostUserInputSchema = z.object({
  login: z.string().min(1).max(70),
  password: z.string().min(1).max(70),
})

export const PostUserOutputSchema = z.object({
  accessToken: z.string(),
})

export const postUserInputValidation = {
  decode: (params: unknown) => PostUserInputSchema.safeParse(params),
}

// export const postUserOutputValidation = {
//   decode: (params: unknown) => PostUserOutputSchema.safeParse(params),
// }
