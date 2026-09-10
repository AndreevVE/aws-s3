import { hasRequiredFields, hasText, isOptionalString, isPositiveInteger } from '#utils';

// Проверяет body создания Post и возвращает нормализованные данные или null.
export const validateCreatePost = (body = {}) => {
  const data = body ?? {};
  const { userId, title, text, coverKey } = data;
  const parsedUserId = Number(userId);

  if (
    !hasRequiredFields(data, ['userId', 'title', 'text']) ||
    !isPositiveInteger(parsedUserId) ||
    !hasText(title) ||
    !hasText(text) ||
    !isOptionalString(coverKey)
  ) {
    return null;
  }

  return {
    userId: parsedUserId,
    title: title.trim(),
    text: text.trim(),
    coverKey: coverKey?.trim() || null,
  };
};
