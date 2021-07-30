import { sign } from 'jsonwebtoken';
import { jwtConfig } from '../config';

const { secret, expiresIn } = jwtConfig;

export default (userId) => sign(
  { userId },
  secret,
  { expiresIn }
);
