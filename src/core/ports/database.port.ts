import { Book, CreateBookInput, BookIdParam } from "../book.interface";
import { ExistingUser } from "../entities/user.entity";

export interface BookRepository {
  list(): Promise<Book[]>
  findById(id: BookIdParam): Promise<Book | null>
  create(input: CreateBookInput): Promise<Book>
  // update(id: string, book: any): Promise<any>
  delete(id: BookIdParam): Promise<boolean>
}


export type CreateUserInput = {
  login: string;
  password: string;
}

export interface UserRepository {
  create(input: CreateUserInput): Promise<ExistingUser | 'USER_ALREADY_EXISTS'>
  findByLoginAndPassword(login: string, password: string): Promise<ExistingUser | null>
  findById(id: string): Promise<ExistingUser | null>
}
