import { isPositiveInteger } from '#utils';
import { findUserById, findUsers } from './services.js';

// Возвращает список пользователей.
export const getUsers = async (_req, res) => {
  try {
    const users = await findUsers();

    return res.json(users);
  } catch (error) {
    console.error('Failed to get users', error);
    return res.status(500).json({ error: 'Could not get users' });
  }
};

// Возвращает одного пользователя по id.
export const getUser = async (req, res) => {
  const id = Number(req.params.id);

  if (!isPositiveInteger(id)) {
    return res.status(404).json({ error: 'User ID is invalid' });
  }

  try {
    const user = await findUserById(id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error('Failed to get user', error);
    return res.status(500).json({ error: 'Could not get users' });
  }
};
