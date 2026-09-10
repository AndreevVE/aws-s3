import { createPostRecord, deletePostRecord, findPostById, findPosts } from './services.js';
import { validateCreatePost } from './validators.js';
import { isPositiveInteger } from '#utils';

// Возвращает список Posts с авторами и URL обложек.
export const getPosts = async (_req, res) => {
  try {
    const posts = await findPosts();
    return res.json(posts);
  } catch (error) {
    console.error('Failed to get posts', error);
    return res.status(500).json({ error: 'Could not get posts' });
  }
};

// Проверяет body и создаёт новый Post.
export const createPost = async (req, res) => {
  const postData = validateCreatePost(req.body);

  if (!postData) {
    return res.status(400).json({ error: 'userId, title, text or coverKey is invalid' });
  }

  try {
    const post = await createPostRecord(postData);

    return res.status(201).json(await findPostById(post.id));
  } catch (error) {
    console.error('Failed to create post', error);
    return res.status(500).json({ error: 'Could not create post' });
  }
};

// Возвращает один Post по id.
export const getPost = async (req, res) => {
  const id = Number(req.params.id);

  // Возвращаем 400, если id не является положительным целым числом.
  if (!isPositiveInteger(id)) {
    return res.status(400).json({ error: 'Post ID is invalid' });
  }

  try {
    const post = await findPostById(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.json(post);
  } catch (error) {
    console.error('Failed to get post', error);
    return res.status(500).json({ error: 'Could not get posts' });
  }
};

// Удаляет Post и его обложку из S3 по id.
export const deletePost = async (req, res) => {
  const id = Number(req.params.id);

  // Возвращаем 400, если id не является положительным целым числом.
  if (!isPositiveInteger(id)) {
    return res.status(400).json({ error: 'Post ID is invalid' });
  }

  try {
    const post = await deletePostRecord(id);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Failed to delete post', error);
    return res.status(500).json({ error: 'Could not delete post' });
  }
};
