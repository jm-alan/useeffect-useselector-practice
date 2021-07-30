import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CreatePost, GetPosts, UnloadPosts } from '../../store/posts';
import SinglePost from './SinglePost';

export default function Posts () {
  const dispatch = useDispatch();

  const allPosts = useSelector(state => state.posts.all);

  const [title, setPostTitle] = useState('');
  const [body, setPostBody] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(CreatePost({ title, body }));
    setPostBody('');
    setPostTitle('');
  };

  useEffect(() => {
    dispatch(GetPosts());
    return () => dispatch(UnloadPosts());
  }, [dispatch]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          onChange={({ target: { value } }) => setPostTitle(value)}
          value={title}
        />
        <input
          onChange={({ target: { value } }) => setPostBody(value)}
          value={body}
        />
        <button type='submit'>Something?</button>
      </form>
      <div className='posts-and-post'>
        <div>
          {Object.values(allPosts).map((post, idx) => (
            <div className='post' key={idx}>
              <h1>
                {post.title}
              </h1>
              <h4>
                {post.body}
              </h4>
            </div>
          ))}
        </div>
        <div>
          <SinglePost />
        </div>
      </div>
    </div>
  );
}
