import csrfetch from './csrfetch';

const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';
const GET_ONE_POST = 'posts/GET_ONE';
const CREATE_POST = 'posts/CREATE';
const UNLOAD_POSTS = 'posts/UNLOAD';
const UNLOAD_CURRENT_POST = 'posts/UNLOAD_CURRENT';

const loadPosts = posts => ({
  type: GET_ALL_POSTS,
  posts
});

const makePost = post => ({
  type: CREATE_POST,
  post
});

export const LoadOnePost = postId => ({
  type: GET_ONE_POST,
  postId
});

export const UnloadCurrentPost = () => ({
  type: UNLOAD_CURRENT_POST
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
  all: {},
  current: null,
  loaded: false
};

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_POSTS:
      return {
        ...state,
        all: {
          ...action.posts
        },
        loaded: true
      };
    case CREATE_POST:
      return {
        ...state,
        all: {
          ...state.all,
          [action.post.id]: action.post
        }
      };
    case GET_ONE_POST:
      return {
        ...state,
        current: state.all[action.postId]
      };
    case UNLOAD_CURRENT_POST:
      return {
        ...state,
        current: null
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
