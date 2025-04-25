import BookListUseCase from "../../../../core/use-cases/book-list.use-case";
import GetBookUseCase from "../../../../core/use-cases/get-book.use-case";
import CreateBookUseCase from "../../../../core/use-cases/create-book.use-case";
import DeleteBookUseCase from "../../../../core/use-cases/delete-book.use-case";
import { type GetBookListOutputSchema } from "./book.schema";

export const list = (): Promise<GetBookListOutputSchema> => new BookListUseCase().execute()
