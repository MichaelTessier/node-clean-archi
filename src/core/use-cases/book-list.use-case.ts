import { container } from "tsyringe";
import { Book } from "../book.interface";
import { Logger } from "../ports/logger.port";
import { BookRepository } from "../ports/database.port";

class BookListUseCase {
  private logger: Logger;
  private bookRepository: BookRepository;

  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.bookRepository = container.resolve<BookRepository>('BookRepository');
  }

  async execute(): Promise<Book[]> {
    this.logger.debug('[BookList] execute');

    return this.bookRepository.list()
  }
}
export default BookListUseCase;
