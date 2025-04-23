import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "../../../../core/book.interface";

@Entity()
class BookEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  author: string;

  @Column()
  totalPages: number;

  @Column({
    type: 'time without time zone',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  toDomainEntity(): Book {
    return {
      id: this.id,
      title: this.title,
      summary: this.summary,
      author: this.author,
      totalPages: this.totalPages,
    }
  }
}

export default BookEntity;
