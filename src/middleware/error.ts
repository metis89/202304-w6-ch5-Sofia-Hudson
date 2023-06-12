import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../types/http.error';

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
) => {
  if (error instanceof HttpError) {
    console.error(error.status, error.statusMessage, error.message);
    response.status(error.status);
    response.statusMessage = error.message;
    response.send({
      status: error.status,
      error: error.message,
    });
    return;
  }

  console.error(error);
  response.status(500);
  response.send({ error: error.message });
};
