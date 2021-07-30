import { Router } from 'express';
import asyncHanlder from 'express-async-handler';

import restoreOrReject from '../../utils/restoreOrReject';
import createToken from '../../utils/createToken';
import { User } from '../../db/models';
import { environment, jwtConfig } from '../../config';

const router = Router();

router.post('/', asyncHanlder(async (req, res) => {
  const { body } = req;
  const user = await User.SignUp(body);
  const token = createToken(user.id);
  const isProduction = environment === 'production';
  res.cookie('token', token, {
    maxAge: jwtConfig.expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction && 'Lax'
  });
  res.json({ user });
}));

router.get(
  '/me/:accountType(personals|communals)/',
  restoreOrReject,
  asyncHanlder(async (req, res) => {
    const { user, params: { accountType } } = req;
    const accountsArray = await user[`get${accountType.upperCaseFirst()}`]();
    const accounts = {};
    for (const account of accountsArray) {
      const Items = {};
      const itemsArray = await account.getItems();
      for (const item of itemsArray) Items[item.id] = item;
      accounts[account.id] = { ...account.dataValues, Items };
    }
    res.json({ accounts });
  })
);

export default router;
