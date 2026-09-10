import { useState } from 'react';
import { createPost } from '../services/posts.js';
import { uploadPostCover } from '../services/uploads.js';

function PostForm({ onCreated }) {
  const [userId, setUserId] = useState('1');
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [cover, setCover] = useState(null);
  const [status, setStatus] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim() || !text.trim() || !cover) {
      setStatus('Заполните заголовок, текст и выберите обложку');
      return;
    }

    setIsSaving(true);

    try {
      // Загружаем файл в AWS S3 и получаем постоянный coverKey.
      setStatus('Загружаем обложку в S3...');
      const coverKey = await uploadPostCover(cover);

      // Создаём Post и передаём ему ключ загруженной обложки.
      setStatus('Сохраняем пост...');
      const post = await createPost({ userId: Number(userId), title, text, coverKey });

      // Сразу добавляем новый Post в список на странице.
      onCreated(post);

      // Очищаем поля формы после успешного создания Post.
      setTitle('');
      setText('');
      setCover(null);
      event.target.reset();

      // Показываем пользователю результат операции.
      setStatus('Пост создан');
    } catch (error) {
      // Показываем ошибку, если upload или создание Post завершились неуспешно.
      setStatus(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <label>
        ID пользователя
        <input
          type="number"
          min="1"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
      </label>

      <label>
        Заголовок
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Например, Мой первый пост"
        />
      </label>

      <label>
        Текст
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="О чём этот пост?"
          rows="3"
        />
      </label>

      <label className="file-field">
        <span>Обложка</span>
        <input
          id="cover"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={(event) => setCover(event.target.files?.[0] || null)}
        />
        <strong>{cover?.name || 'Выберите файл'}</strong>
      </label>

      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Сохраняем...' : 'Создать пост'}
      </button>

      {status && <p className="status">{status}</p>}
    </form>
  );
}

export default PostForm;
