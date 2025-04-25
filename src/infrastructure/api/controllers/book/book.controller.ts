import { Controller, Get, SuccessResponse, Post, Delete, Route,Response,  Body, Path, Tags, Security } from "tsoa";
import { Book, CreateBookInput, BookIdParam } from "../../../../core/book.interface";
import { createBookValidation, getBookValidation, PostBookOutputDto } from "./book.schema";
import BookListUseCase from "../../../../core/use-cases/book-list.use-case";
import GetBookUseCase from "../../../../core/use-cases/get-book.use-case";
import CreateBookUseCase from "../../../../core/use-cases/create-book.use-case";
import DeleteBookUseCase from "../../../../core/use-cases/delete-book.use-case";
import { InvalidInputError, NotFoundError } from "../../error-handler";
import { list } from "./book.service";

@Route("books")
@Tags("books")
@Security("jwt")
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
  async list() {
    return await list()
  }


  /**
   * @summary Get a book by ID
   * @param {string} id - Book ID
   * @returns {Book} Book details
   */
  @Get('{id}')
  @SuccessResponse(200)
  @Response(400, "Invalid request params")
  @Response(404, "Book not found")
  async getById(
    @Path() id: BookIdParam
  ): Promise<Book> {
    const bookId = getBookValidation.decodeBookId(id)

    if (!bookId.success) {
      throw new InvalidInputError('INVALID_BOOK_ID')
    }

    const book = await new GetBookUseCase().execute(bookId.data)

    if (book === 'BOOK_NOT_FOUND') {
      throw new NotFoundError("BOOK_NOT_FOUND")
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
  @Response(400, "Invalid request params")
  async create(
    @Body() requestBody: CreateBookInput
  ): Promise<Book> {
    const inputDecoded = createBookValidation.decode(requestBody)

    if (!inputDecoded.success) {
      throw new InvalidInputError(inputDecoded.error.toString())
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
  @Response(400, "Invalid request params")
  @Response(404, "Book not found")
  async delete(
    @Path() id: BookIdParam
  ): Promise<void> {
    const bookId = getBookValidation.decodeBookId(id)

    if (!bookId.success) {
      throw new InvalidInputError("INVALID_BOOK_ID")
    }

    const book = await new DeleteBookUseCase().execute(bookId.data)
    
    if (book === 'BOOK_NOT_FOUND') {
      throw new NotFoundError("BOOK_NOT_FOUND")
    }

    return
  }
}
