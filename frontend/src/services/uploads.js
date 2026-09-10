import appConfig from '../config/app.js';

export const uploadPostCover = async (file) => {
  // Backend возвращает временный uploadUrl и постоянный fileKey для объекта.
  console.log('→ POST /uploads/upload-url: запрашиваем URL для обложки');
  const response = await fetch(`${appConfig.apiUrl}/uploads/upload-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      entity: 'post',
      type: 'cover',
      contentType: file.type,
      sizeBytes: file.size,
    }),
  });

  console.log(`← POST /uploads/upload-url: ${response.status} ${response.statusText}`);
  if (!response.ok) throw new Error('Не удалось получить presigned URL');

  const { uploadUrl, fileKey } = await response.json();
  console.log(`✓ Backend вернул временный uploadUrl: ${uploadUrl}`);
  console.log(`✓ Key объекта внутри bucket: ${fileKey}`);

  // Frontend отправляет выбранный файл в body PUT-запроса на временный uploadUrl.
  // Этот PUT идёт напрямую из браузера в S3, минуя backend.
  console.log(`→ S3 PUT по uploadUrl: ${uploadUrl}`);
  console.log(`→ Key объекта внутри bucket: ${fileKey}`);
  const upload = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type },
    body: file,
  });

  console.log(
    `← S3 PUT по uploadUrl; Key объекта ${fileKey}: ${upload.status} ${upload.statusText}`,
  );
  if (!upload.ok) throw new Error('Не удалось загрузить файл в S3');

  console.log(`✓ S3 сохранил объект: ${fileKey}`);

  return fileKey;
};
