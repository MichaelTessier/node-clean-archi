import { Book, CreateBookInput, GetBookIdParams } from "../book.interface";

export interface BookRepository {
  list(): Promise<Book[]>
  findById(id: GetBookIdParams): Promise<Book | null>
  create(input: CreateBookInput): Promise<Book>
  // update(id: string, book: any): Promise<any>
  delete(id: GetBookIdParams): Promise<boolean>
}
