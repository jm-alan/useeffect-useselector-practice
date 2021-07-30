import { NextFunction } from "express";
import { ValidationError } from 'sequelize';
import { ExtendedValidationError, RequestError } from "../RequestError";

export default (err: RequestError | Error | ValidationError, _req, _res, next: NextFunction) => {
  if (err instanceof ValidationError) {
    const errOut = new ExtendedValidationError('Validation Error', err.message);
    errOut.errors = err.errors.map(e => e.message);
    return next(errOut);
  } else return next(err);
}
