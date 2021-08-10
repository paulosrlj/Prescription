import { NextFunction, Response, Request } from 'express';
import { ValidationError } from 'yup';
import ApplicationErrors from '../errors/ApplicationErrors';

interface IValidationErrors {
  [key: string]: string[];
}

export function exceptionsHandle(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): Response<any, Record<string, any>> {
  if (err instanceof ApplicationErrors) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  if (err instanceof ValidationError) {
    // console.log(err);
    const errors: IValidationErrors = {};
    err.inner.forEach(e => {
      errors[e.path] = e.errors;
    });
    return res.status(400).json({ message: 'Validation errors:', errors });
  }

  console.log(err);

  return res.status(500).json({
    status: 'Error',
    message: 'Server internal error',
  });
}
