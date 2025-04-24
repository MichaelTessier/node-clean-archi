import { Book, CreateBookInput, BookIdParam } from "../book.interface";

export interface BookRepository {
  list(): Promise<Book[]>
  findById(id: BookIdParam): Promise<Book | null>
  create(input: CreateBookInput): Promise<Book>
  // update(id: string, book: any): Promise<any>
  delete(id: BookIdParam): Promise<boolean>
}
