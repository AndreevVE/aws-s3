import { User } from '#models';

const publicUserAttributes = { exclude: ['passwordHash'] };

export const findUsers = () =>
  User.findAll({
    attributes: publicUserAttributes,
    order: [['id', 'ASC']],
  });

export const findUserById = (id) =>
  User.findByPk(id, {
    attributes: publicUserAttributes,
  });
