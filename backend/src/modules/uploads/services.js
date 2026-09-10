import { randomUUID } from 'node:crypto';
import { createPresignedUploadUrl } from '#storage';

const uploadFolders = {
  post: {
    cover: 'posts/covers',
  },
  user: {
    avatar: 'users/avatars',
  },
};

// Возвращает расширение файла для разрешённого MIME-типа.
const getExtension = (contentType) =>
  ({
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
  })[contentType];

// Создаёт ключ файла, получает presigned upload URL и возвращает данные для frontend.
export const prepareUpload = async ({ entity, type, contentType, sizeBytes }) => {
  const folder = uploadFolders[entity][type];
  const fileKey = `${folder}/${randomUUID()}.${getExtension(contentType)}`;
  const uploadUrl = await createPresignedUploadUrl({ fileKey, contentType });

  return {
    uploadUrl,
    fileKey,
    contentType,
    sizeBytes,
    expiresIn: 300,
  };
};
