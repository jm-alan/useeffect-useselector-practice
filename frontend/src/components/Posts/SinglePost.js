import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { LoadOnePost, UnloadCurrentPost } from '../../store/posts';

export default function SinglePost () {
  const dispatch = useDispatch();

  const { postId } = useParams();

  const currentPost = useSelector(state => state.posts.current) || null;
  const postsLoaded = useSelector(state => state.posts.loaded);

  useEffect(() => {
    postsLoaded && dispatch(LoadOnePost(postId));
    return () => dispatch(UnloadCurrentPost());
  }, [dispatch, postId, postsLoaded]);

  return postId && (postsLoaded
    ? (currentPost
        ? (
          <h1>{currentPost.title}</h1>
          )
        : <h1>Sorry that post doesn't exist</h1>)
    : <h1>Loading...</h1>);
}
