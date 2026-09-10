import PostCard from './PostCard.jsx';

function PostList({ posts, onDelete }) {
  // Если API вернул пустой список, показываем понятное состояние.
  if (posts.length === 0) return <p>Постов пока нет</p>;

  return (
    <>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} onDelete={onDelete} />
      ))}
    </>
  );
}

export default PostList;
