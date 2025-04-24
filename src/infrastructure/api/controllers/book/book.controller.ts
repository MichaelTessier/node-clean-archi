import { Controller, Get, SuccessResponse, Post, Delete, Route, Body, Path, Tags } from "tsoa";
import { Book, CreateBookInput, BookIdParam } from "../../../../core/book.interface";
import { createBookValidation, getBookValidation } from "./book.schema";
import BookListUseCase from "../../../../core/use-cases/book-list.use-case";
import GetBookUseCase from "../../../../core/use-cases/get-book.use-case";
import CreateBookUseCase from "../../../../core/use-cases/create-book.use-case";
import DeleteBookUseCase from "../../../../core/use-cases/delete-book.use-case";

@Route("books")
@Tags("books")
export class BookController extends Controller {
  constructor() {
    super();
  }

  /**
   * @summary Get all books
   * @returns {Book[]} List of books
   */
  @Get()
  @SuccessResponse(200)
  async list(): Promise<Book[]> {
    return await new BookListUseCase().execute()
  }


  /**
   * @summary Get a book by ID
   * @param {string} id - Book ID
   * @returns {Book} Book details
   */
  @Get('{id}')
  @SuccessResponse(200)
  async getById(
    @Path() id: BookIdParam
  ): Promise<Book> {
    const bookId = getBookValidation.decodeBookId(id)

    if (!bookId.success) {
      throw new Error("Invalid book ID")
    }

    const book = await new GetBookUseCase().execute(bookId.data)

    if (book === 'Book not found') {
      throw new Error("Book not found")
    }

    return book
  }

  /**
   * @summary Create a new book
   * @param {CreateBookInput} requestBody - Book details
   * @returns {Book} Created book
   */
  @Post()
  @SuccessResponse(201)
  async create(
    @Body() requestBody: CreateBookInput
  ): Promise<Book> {
    const inputDecoded = createBookValidation.decode(requestBody)

    if (!inputDecoded.success) {
      throw inputDecoded.error.toString()
    }

    const book = await new CreateBookUseCase().execute(inputDecoded.data)

    return book
  }


  /**
   * @summary Delete a book by ID
   * @param {string} id - Book ID
   */
  @Delete('{id}')
  @SuccessResponse(204)
  async delete(
    @Path() id: BookIdParam
  ): Promise<void> {
    const bookId = getBookValidation.decodeBookId(id)

    if (!bookId.success) {
      throw new Error("Invalid book ID")
    }

    const book = await new DeleteBookUseCase().execute(bookId.data)
    
    if (book === 'Book not found') {
      throw new Error("Book not found")
    }

    return
  }
}
