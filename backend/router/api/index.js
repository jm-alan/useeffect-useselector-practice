import { Router } from 'express';

import sessionRouter from './session';
import userRouter from './users';
import postRouter from './posts';

const router = Router();

router.use('/session', sessionRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);

router.get('/csrf/restore/', (req, res) => {
  const token = req.csrfToken();
  res.cookie('XSRF-TOKEN', token);
  res.status(201).json({ token });
});

export default router;
