export interface Book {
  id: string;
  title: string;
  summary: string;
  author: string;
  totalPages: number;
}

export interface CreateBookInput extends Pick<Book, 'title'|'summary'|'author'|'totalPages'> {}


export type BookIdParam = string
