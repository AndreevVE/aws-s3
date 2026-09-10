import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Config, { areS3UploadsEnabled } from '#config/s3.js';

// Создаём AWS S3 client только после настройки и включения загрузок.
const s3Client = areS3UploadsEnabled ? new S3Client({ region: s3Config.awsRegion }) : null;

// Возвращает временный URL для загрузки файла браузером напрямую в S3.
export const createPresignedUploadUrl = async ({ fileKey, contentType }) => {
  if (!s3Client) {
    throw new Error('S3 uploads are not configured');
  }

  // Подготавливаем временную ссылку, по которой браузер загрузит файл в S3.
  const command = new PutObjectCommand({
    Bucket: s3Config.awsS3Bucket,
    Key: fileKey,
    ContentType: contentType,
  });

  // Подписываем команду credentials backend и возвращаем Promise со строкой временного URL.
  // getSignedUrl только создаёт адрес: загрузку файла позже выполняет браузер.
  return getSignedUrl(s3Client, command, { expiresIn: 300 });
};

// Возвращает временный URL для чтения приватного файла из S3.
export const createDownloadUrl = async (fileKey) => {
  if (!s3Client) {
    throw new Error('S3 uploads are not configured');
  }

  // Подготавливаем временную ссылку для чтения приватного объекта из S3.
  const command = new GetObjectCommand({
    Bucket: s3Config.awsS3Bucket,
    Key: fileKey,
  });

  // Подписываем команду чтения и возвращаем Promise со строкой временного URL.
  // Сам объект этим вызовом не скачивается: URL использует frontend.
  return getSignedUrl(s3Client, command, { expiresIn: 300 });
};

// Удаляет объект из bucket по постоянному ключу файла.
export const deleteObject = async (fileKey) => {
  if (!s3Client) {
    throw new Error('S3 uploads are not configured');
  }

  // Описываем AWS SDK операцию удаления объекта из S3.
  const command = new DeleteObjectCommand({
    Bucket: s3Config.awsS3Bucket,
    Key: fileKey,
  });

  // Отправляем команду в S3 и ждём завершения удаления.
  return s3Client.send(command);
};
