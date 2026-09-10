function PostCard({ post, onDelete }) {
  // coverUrl показывает файл, а coverKey — постоянный путь объекта в S3.
  return (
    <article className="post-card">
      <div>
        <p>
          POST #{post.id} · USER #{post.userId}
        </p>
        <h3>{post.title}</h3>
        <p>{post.text}</p>
      </div>

      {post.coverUrl && <img src={post.coverUrl} alt={`Обложка: ${post.title}`} />}

      {post.coverKey && <code>{post.coverKey}</code>}

      <button type="button" onClick={() => onDelete(post.id)}>
        Удалить пост
      </button>
    </article>
  );
}

export default PostCard;
