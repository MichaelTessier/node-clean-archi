import { z } from 'zod';

export const BookOutputSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1),
  summary: z.string().min(5),
  author: z.string().min(1),
  totalPages: z.number().min(1),
});


// export const GetBookOutputSchema = BookOutputSchema;
// export const GetBookListOutputSchema = z.array(BookOutputSchema);

export const BookIdSchema = z.string().uuid();

export const PostBookInputSchema = z.object({
  title: z.string().min(1).max(70),
  summary: z.string().min(1).max(255),
  author: z.string().min(1).max(70),
  totalPages: z.number().int().positive(),
})

// export const PostBookOutputDto = BookOutputSchema


export const createBookValidation = {
  decode: (params: unknown) => PostBookInputSchema.safeParse(params),
}

export const getBookValidation = {
  decodeBookId: (params: unknown) => BookIdSchema.safeParse(params),
}
