import { Book, CreateBookInput, BookIdParam } from "../../../../core/book.interface";
import { BookRepository } from "../../../../core/ports/database.port";
import { AppDataSource, isInitialized } from "../data-source";
import BookEntity from "./book.entity";

class TypeOrmBookRepository implements BookRepository {
  async create(input: CreateBookInput): Promise<Book> {
    await isInitialized()
    
    const result = await AppDataSource.getRepository(BookEntity).insert(input)

    const identifier = result.identifiers[0]

    if(!identifier) {
      throw 'Error when creating book identifier'
    }

    const book = await AppDataSource.getRepository(BookEntity).findOne({
      where: { id: identifier.id }
    })

    if(!book) {
      throw 'Error when creating book'
    }

    return book.toDomainEntity()
  }

  async list(): Promise<Book[]> {
    await isInitialized()

    const books = await AppDataSource.getRepository(BookEntity).find()

    return books.map((book) => book.toDomainEntity())
  }
  async findById(id: string): Promise<Book | null> {
    await isInitialized()

    const book = await AppDataSource.getRepository(BookEntity).findOne({
      where: { id}
    })

    return book ? book.toDomainEntity() : null
  }

  async delete(id: BookIdParam): Promise<boolean> {
    await isInitialized()

    const result = await AppDataSource.getRepository(BookEntity).delete(id)

    return result.affected === 1
  }
} 

export default TypeOrmBookRepository
