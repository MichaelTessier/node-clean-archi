import { container } from "tsyringe";
import { Book, CreateBookInput } from "../book.interface";
import { Logger } from "../ports/logger.port";
import { BookRepository } from "../ports/database.port";

class CreateBookUseCase {
  private logger: Logger;
  private bookRepository: BookRepository;

  constructor() {
    this.logger = container.resolve<Logger>('Logger');
    this.bookRepository = container.resolve<BookRepository>('BookRepository');
  }

  async execute(input: CreateBookInput): Promise<Book> {
    this.logger.debug('[CreateBook] execute');

    const data = await this.bookRepository.create(input)

    return data
  }
}
export default CreateBookUseCase;
