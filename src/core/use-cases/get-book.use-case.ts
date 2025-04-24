import { container } from "tsyringe";
import { Book, BookIdParam } from "../book.interface";
import { Logger } from "../ports/logger.port";
import { BookRepository } from "../ports/database.port";

class GetBookUseCase {
  private logger: Logger;
  private bookRepository: BookRepository;

  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.bookRepository = container.resolve<BookRepository>('BookRepository');
  }

  async execute(id: BookIdParam): Promise<Book | 'Book not found'> {
    this.logger.debug('[GetBook] execute');

    const data = await this.bookRepository.findById(id)

    return data ?? 'Book not found'
  }
}
export default GetBookUseCase;
