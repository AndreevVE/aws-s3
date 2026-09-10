import { useEffect, useState } from 'react';
import { deletePost, getPosts } from './services/posts.js';
import PostForm from './components/PostForm.jsx';
import PostList from './components/PostList.jsx';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('');

  const handleDelete = async (id) => {
    if (!window.confirm(`Удалить Post #${id} и его обложку из S3?`)) return;

    try {
      await deletePost(id);
      setPosts((items) => items.filter((post) => post.id !== id));
      setStatus(`Post #${id} удалён`);
    } catch (error) {
      setStatus(error.message);
    }
  };

  useEffect(() => {
    // При открытии страницы получаем посты из MySQL через backend API.
    getPosts()
      .then(setPosts)
      .catch((error) => setStatus(error.message));
  }, []);

  return (
    <main className="page-shell">
      <section className="intro">
        <p className="eyebrow">AWS S3 / POSTS</p>
        <h1>Создать пост</h1>
        <p className="description">
          Обложка загружается напрямую в S3, а её постоянный fileKey сохраняется в посте.
        </p>
      </section>

      {/* Добавляем новый Post в состояние страницы после создания в форме. */}
      <PostForm onCreated={(post) => setPosts((items) => [post, ...items])} />

      {status && (
        <p className="status" style={{ margin: '1rem 2rem' }}>
          {status}
        </p>
      )}

      <section className="posts-section">
        <div style={{ padding: '0 2rem' }}>
          <p className="eyebrow">LATEST</p>
          <h2>Добавленные посты</h2>
        </div>
        {/* Передаём загруженные Post в компонент списка. */}
        <PostList posts={posts} onDelete={handleDelete} />
      </section>
    </main>
  );
}

export default App;
