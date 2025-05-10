import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

function Feed() {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setPosts(res.data);
      } catch (err) {
        setError('Failed to fetch posts');
      }
    };
    fetchPosts();
  }, []);

  // Create post
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setPosts([res.data, ...posts]);
      setContent('');
      setImage(null);
    } catch (err) {
      setError('Failed to create post');
    }
  };

  // Like post
  const handleLike = async (postId) => {
    try {
      const res = await axios.post(`http://localhost:5000/api/posts/${postId}/like`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setPosts(posts.map((post) => (post._id === postId ? res.data : post)));
    } catch (err) {
      setError('Failed to like post');
    }
  };

  // Comment on post
  const handleComment = async (postId, commentContent) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/posts/${postId}/comment`,
        { content: commentContent },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setPosts(posts.map((post) => (post._id === postId ? res.data : post)));
    } catch (err) {
      setError('Failed to comment');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-navy-blue mb-4">Team Feed</h2>
      {user && (
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <form onSubmit={handlePostSubmit}>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-300 mb-2"
              placeholder="What's on your mind?"
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="mb-2"
            />
            <button
              type="submit"
              className="teal-accent text-white px-4 py-2 rounded hover:bg-teal-400 transition duration-200"
            >
              Post
            </button>
          </form>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <div className="space-y-4">
        {posts.map((post) => (
          <div
            key={post._id}
            className={`bg-white p-4 rounded-lg shadow-md ${post.sentiment.toLowerCase()}`}
          >
            <p className="font-bold">{post.user.email} ({post.user.department})</p>
            <p className="mt-2">{post.content}</p>
            {post.image && (
              <img src={`http://localhost:5000/${post.image}`} alt="Post" className="mt-2 max-w-xs rounded" />
            )}
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => handleLike(post._id)}
                className="text-teal-500 hover:text-teal-700"
              >
                {post.likes.includes(user?._id) ? 'Unlike' : 'Like'} ({post.likes.length})
              </button>
              <button
                onClick={() => {
                  const comment = prompt('Enter your comment:');
                  if (comment) handleComment(post._id, comment);
                }}
                className="text-teal-500 hover:text-teal-700"
              >
                Comment ({post.comments.length})
              </button>
            </div>
            {post.comments.length > 0 && (
              <div className="mt-2">
                <p className="font-semibold">Comments:</p>
                {post.comments.map((comment, index) => (
                  <p key={index} className="text-sm text-gray-600">{comment.content}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Feed;