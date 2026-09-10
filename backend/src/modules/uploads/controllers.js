import s3Config, { isS3Configured } from '#config/s3.js';
import { prepareUpload } from './services.js';
import { validateUpload } from './validators.js';

// Обрабатывает запрос frontend на подготовку загрузки файла в S3.
export const getUploadUrl = async (req, res) => {
  // Не создаём ссылку, если возможность загрузки отключена настройкой.
  if (!s3Config.uploadsEnabled) {
    return res.status(503).json({ error: 'S3 uploads are disabled' });
  }

  // Не создаём ссылку, если не указаны регион или имя bucket.
  if (!isS3Configured) {
    return res.status(503).json({ error: 'S3 is not configured' });
  }

  // Проверяем тип загрузки, MIME-тип и размер до обращения к S3.
  const uploadData = validateUpload(req.body);

  if (!uploadData) {
    return res.status(400).json({ error: 'entity, type, contentType or sizeBytes is invalid' });
  }

  try {
    // Service создаёт fileKey и временный presigned URL для frontend.
    const upload = await prepareUpload(uploadData);

    // Возвращаем frontend данные для прямой загрузки файла в S3.
    return res.json(upload);
  } catch (error) {
    // Возвращаем серверную ошибку, если подготовить загрузку не удалось.
    console.error('Failed to create S3 upload URL', error);
    return res.status(500).json({ error: 'Could not create upload URL' });
  }
};
