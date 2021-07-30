import { RequestError } from '../RequestError';

export default function (req, _res, next) {
  if (req.user) return next();

  const err = new RequestError(
    'Unauthorized',
    'You must be logged in to access this resource',
    401
  );
  next(err);
}
