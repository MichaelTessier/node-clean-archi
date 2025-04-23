export interface Book {
  id: string;
  title: string;
  summary: string;
  author: string;
  totalPages: number;
}

export interface CreateBookInput extends Omit<Book, 'title'|'summary'> {}


export type GetBookIdParams = string
