import { Controller, Get, SuccessResponse, Post, Delete, Route, Body, Path, Tags } from "tsoa";
import { Book, CreateBookInput, GetBookIdParams } from "./book.interface";
import { createBookValidation, getBookValidation } from "./book.schema";

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
    return []
  }


  /**
   * @summary Get a book by ID
   * @param {string} id - Book ID
   * @returns {Book} Book details
   */
  @Get('{id}')
  @SuccessResponse(200)
  async getById(
    @Path() id: string
  ): Promise<Book> {
    const bookId = getBookValidation.decodeBookId(id)

    if (!bookId.success) {
      throw new Error("Invalid book ID")
    }

    return {
      id: '1',
      title: 'Book Title',
      summary: 'Book Summary',
      author: 'Book Author',
      totalPages: 100,
    }
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

    return {
      id: '1',
      title: 'Book Title',
      summary: 'Book Summary',
      author: 'Book Author',
      totalPages: 100,
    }
  }


  /**
   * @summary Delete a book by ID
   * @param {string} id - Book ID
   */
  @Delete('{id}')
  @SuccessResponse(204)
  async delete(
    @Path() id: GetBookIdParams
  ): Promise<void> {
    const bookId = getBookValidation.decodeBookId(id)

    if (!bookId.success) {
      throw new Error("Invalid book ID")
    }

    return
  }
}
