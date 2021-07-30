import express, { Router } from 'express';
import { resolve } from 'path';

import apiRouter from './api';

const router = Router();

router.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  const mainIndex = resolve(__dirname, '../../frontend', 'build', 'index.html');
  router.get('/', (_req, res) => {
    res.sendFile(mainIndex);
  });

  router.use(express.static(resolve('../frontend/build')));

  router.get(/^(?!\/?api).*/, (_req, res) => {
    res.sendFile(mainIndex);
  });
}

export default router;
