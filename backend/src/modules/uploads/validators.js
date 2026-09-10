import { hasRequiredFields, isIntegerBetween, isOneOf, matchesFields } from '#utils';

const uploadTypes = {
  post: 'cover',
  user: 'avatar',
};

const allowedContentTypes = ['image/jpeg', 'image/png', 'image/webp'];
const maxFileSize = 5 * 1024 * 1024;
const requiredFields = ['entity', 'type', 'contentType', 'sizeBytes'];

// Проверяет body upload-запроса и возвращает данные для service или null.
export const validateUpload = (body = {}) => {
  const data = body ?? {};
  const { entity, type, contentType, sizeBytes } = data;

  if (
    !hasRequiredFields(data, requiredFields) ||
    !Object.entries(uploadTypes).some(([uploadEntity, uploadType]) =>
      matchesFields(data, { entity: uploadEntity, type: uploadType }),
    ) ||
    !isOneOf(contentType, allowedContentTypes) ||
    !isIntegerBetween(sizeBytes, 1, maxFileSize)
  ) {
    return null;
  }

  return { entity, type, contentType, sizeBytes };
};
