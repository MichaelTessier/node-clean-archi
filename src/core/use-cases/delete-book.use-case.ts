import { container } from "tsyringe";
import { Book, BookIdParam } from "../book.interface";
import { Logger } from "../ports/logger.port";
import { BookRepository } from "../ports/database.port";

class DeleteBookUseCase {
  private logger: Logger;
  private bookRepository: BookRepository;

  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.bookRepository = container.resolve<BookRepository>('BookRepository');
  }

  async execute(id: BookIdParam): Promise<void | 'BOOK_NOT_FOUND'> {
    this.logger.debug('[DeleteBook] execute');

    const data = await this.bookRepository.delete(id)

    if(!data) {
      return 'BOOK_NOT_FOUND'
    }
  }
}
export default DeleteBookUseCase;
