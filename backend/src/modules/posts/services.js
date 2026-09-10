import { Post, User } from '#models';
import { createDownloadUrl, deleteObject } from '#storage';

const authorAttributes = ['id', 'fullname'];

const withAuthor = {
  model: User,
  as: 'user',
  attributes: authorAttributes,
};

// Создаёт запись Post в MySQL через Sequelize и возвращает созданную модель.
export const createPostRecord = ({ userId, title, text, coverKey }) =>
  Post.create({ userId, title, text, coverKey });

// Удаляет обложку из S3, если она есть, затем удаляет сам Post из MySQL.
export const deletePostRecord = async (id) => {
  const post = await Post.findByPk(id);

  if (!post) return null;

  if (post.coverKey) await deleteObject(post.coverKey);

  await post.destroy();
  return post;
};

// Получает все Posts с авторами и временными URL обложек.
export const findPosts = () =>
  Post.findAll({
    include: [withAuthor],
    order: [['createdAt', 'DESC']],
  }).then(addCoverUrls);

// Получает один Post по id с автором и временным URL обложки.
export const findPostById = (id) =>
  Post.findByPk(id, {
    include: [withAuthor],
  }).then((post) => (post ? addCoverUrl(post) : post));

// Добавляет к Post временный URL чтения обложки из S3.
const addCoverUrl = async (post) => {
  const data = post.toJSON();

  return {
    ...data,
    coverUrl: data.coverKey ? await createDownloadUrl(data.coverKey) : null,
  };
};

// Добавляет временные URL обложек ко всем Posts параллельно.
const addCoverUrls = (posts) => Promise.all(posts.map(addCoverUrl));
