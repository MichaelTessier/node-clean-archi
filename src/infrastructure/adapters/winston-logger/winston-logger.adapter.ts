import winston from "winston";
import { Logger } from "../../../core/ports/logger.port";

type LogLevel = "error" | "warn" | "info" | "debug";

export class WinstonLogger implements Logger {
  private logger: winston.Logger;

  constructor(logLevel: LogLevel) {
    this.logger = winston.createLogger({
      level: logLevel,
      format: winston.format.json(),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    });
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  error(message: string): void {
    this.logger.error(message);
  }


  info(message: string): void {
    this.logger.info(message);
  }

  warning(message: string): void {
    this.logger.warn(message);
  }
} 
