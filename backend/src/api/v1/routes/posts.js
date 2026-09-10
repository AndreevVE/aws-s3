import { Router } from 'express';
import { createPost, deletePost, getPosts, getPost } from '#modules/posts/controllers.js';

const router = Router();

router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.delete('/:id', deletePost);

export default router;
