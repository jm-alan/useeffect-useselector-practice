import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import restoreOrReject from '../../utils/restoreOrReject';

const router = Router();

router.get('/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user } = req;
  const posts = (await user.getPosts()).toKeyedObject('id');
  res.json({ posts });
}));

router.post('/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, body } = req;
  const post = await user.createPost(body);
  res.json({ post });
}));

export default router;
