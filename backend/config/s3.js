import 'dotenv/config';
import { parseBoolean } from '#utils';

const s3Config = {
  // Флаг приложения: разрешать ли S3 upload flow.
  uploadsEnabled: parseBoolean(process.env.MEDIA_UPLOADS_ENABLED, false),
  // AWS SDK умеет читать AWS_REGION сам, но конфиг хранит его явно для проверки.
  awsRegion: process.env.AWS_REGION || '',
  // Bucket нужен приложению для Bucket в каждой S3-команде.
  awsS3Bucket: process.env.AWS_S3_BUCKET || '',
};

export const isS3Configured = Boolean(
  s3Config.awsRegion && s3Config.awsS3Bucket,
);

export const areS3UploadsEnabled =
  s3Config.uploadsEnabled && isS3Configured;

export default s3Config;
