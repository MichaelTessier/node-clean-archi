import "reflect-metadata"
import { container } from "tsyringe";
import { Book } from "../src/core/book.interface";
import { BookRepository } from "../src/core/ports/database.port";
import { Logger } from "../src/core/ports/logger.port";
import GetBookUseCase from "../src/core/use-cases/get-book.use-case";

describe('GetBook', () => {
  const id = '1'
  const mock_data: Book = {
    id,
    title: 'Book 1',
    summary: 'Summary 1',
    author: 'Author 1',
    totalPages: 100,
  }

  const mock_findById = jest.fn()
  const mock_bookRepository = {
    findById: mock_findById
  }

  container.register<Partial<BookRepository>>('BookRepository', {
    useValue: mock_bookRepository
  });

  container.register<Partial<Logger>>('Logger', {
    useValue: {
      debug: jest.fn(),
    }
  })

  it('should return book', async () => {
    mock_findById.mockResolvedValue(mock_data)

    const response = await new GetBookUseCase().execute(id)

    expect(response).toEqual(mock_data)
    expect(container.resolve<Logger>('Logger').debug).toHaveBeenCalledWith('[GetBook] execute')
    expect(container.resolve<BookRepository>('BookRepository').findById).toHaveBeenCalledWith(id)
  });

  it('should return not found if wrong id', async () => {
    mock_findById.mockResolvedValue(null)

    const response = await new GetBookUseCase().execute(id)

    expect(response).toEqual('Book not found')
  });
})
