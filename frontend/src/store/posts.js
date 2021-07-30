import csrfetch from './csrfetch';

const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';
const CREATE_POST = 'posts/CREATE';
const UNLOAD_POSTS = 'posts/UNLOAD';

const loadPosts = posts => ({
  type: GET_ALL_POSTS,
  posts
});

const makePost = post => ({
  type: CREATE_POST,
  post
});

export const UnloadPosts = () => ({
  type: UNLOAD_POSTS
});

export const GetPosts = () => async dispatch => {
  const { posts } = await csrfetch.get('/api/posts/');
  dispatch(loadPosts(posts));
};

export const CreatePost = newPost => async dispatch => {
  const { post } = await csrfetch.post('/api/posts/', newPost);
  dispatch(makePost(post));
};

const initialState = {
  all: {}
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        all: {
          ...action.posts
        }
      };
    case CREATE_POST:
      return {
        ...state,
        all: {
          ...state.all,
          [action.post.id]: action.post
        }
      };
    case UNLOAD_POSTS:
      return {
        ...initialState,
        all: {
          ...initialState.all
        }
      };
    default:
      return state;
  }
}
