import { NextFunction, Request, Response } from "express";

export class NotFoundError extends Error {}
export class ConflictError extends Error {}
export class InvalidInputError extends Error {}
export class ForbiddenError extends Error {}
export class UnauthorizedError extends Error {}

export function errorHandler(error: unknown, req: Request, res: Response, next: NextFunction) {

  if(error instanceof NotFoundError) {
    res.status(404).json({ message: error.message });
  }

  if(error instanceof ConflictError) {
    res.status(409).json({ message: error.message });
  }

  if(error instanceof InvalidInputError) {
    res.status(400).json({ message: error.message });
  }

  if(error instanceof ForbiddenError) {
    res.status(403).json({ message: error.message });
  }

  if(error instanceof UnauthorizedError) {
    res.status(401).json({ message: error.message });
  }

  if(error instanceof Error) {
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }

  next()
}
