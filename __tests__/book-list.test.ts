import "reflect-metadata"
import { container } from "tsyringe";
import { Book } from "../src/core/book.interface";
import { BookRepository } from "../src/core/ports/database.port";
import { Logger } from "../src/core/ports/logger.port";
import BookListUseCase from "../src/core/use-cases/book-list.use-case";

describe('BookList', () => {
  const mock_data: Book[] = [
    {
      id: '1',
      title: 'Book 1',
      summary: 'Summary 1',
      author: 'Author 1',
      totalPages: 100,
    },
    {
      id: '2',
      title: 'Book 2',
      summary: 'Summary 2',
      author: 'Author 2',
      totalPages: 100,
    }
  ]

  const mock_list = jest.fn()
  const mock_bookRepository = {
    list: mock_list
  }

  container.register<Partial<BookRepository>>('BookRepository', {
    useValue: mock_bookRepository
  });

  container.register<Partial<Logger>>('Logger', {
    useValue: {
      debug: jest.fn(),
    }
  })

  it('should return list book', async () => {
    // expect(true).toBe(true);
    mock_list.mockResolvedValue(mock_data)

    const response = await new BookListUseCase().execute()

    expect(response).toEqual(mock_data)
    expect(container.resolve<BookRepository>('BookRepository').list).toHaveBeenCalledTimes(1)
    expect(container.resolve<Logger>('Logger').debug).toHaveBeenCalledWith('[BookList] execute')
  });
})
