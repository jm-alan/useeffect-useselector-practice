import { verify } from 'jsonwebtoken';
import { jwtConfig } from '../config';
import db from '../db/models';

export default async function (req, res, next) {
  const { cookies: { token } } = req;
  try {
    const { userId } = verify(token, jwtConfig.secret);
    req.user = await db.User.findByPk(userId);
    req.user ?? res.clearCookie('token');
    next();
  } catch (err) {
    next();
  }
}
