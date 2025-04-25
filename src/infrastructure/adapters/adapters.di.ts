import { container } from "tsyringe";
import { Logger } from "../../core/ports/logger.port";
import winstonLoggerConfig from "./winston-logger/winston-logger.config";
import { LogLevel, WinstonLogger } from "./winston-logger/winston-logger.adapter";
import { BookRepository, UserRepository } from "../../core/ports/database.port";
import TypeOrmBookRepository from "./type-orm/book/book.repository";
import TypeOrmUserRepository from "./type-orm/user/user.repository";

container
  .register<Logger>('Logger', {
    useValue: new WinstonLogger(winstonLoggerConfig.logLevel as LogLevel)
  })
  .register<BookRepository>('BookRepository', {
    useValue: new TypeOrmBookRepository()
  })
  .register<UserRepository>('UserRepository', {
    useValue: new TypeOrmUserRepository()
  })
