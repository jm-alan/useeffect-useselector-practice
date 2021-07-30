const SET_ERRORS = 'errors/SET';
const CLEAR_ERRORS = 'errors/CLEAR';

export const SetErrors = current => ({
  type: SET_ERRORS,
  current
});

export const ClearErrors = () => ({
  type: CLEAR_ERRORS
});

export default function reducer (
  state = { current: null },
  { type, current }
) {
  switch (type) {
    case SET_ERRORS:
      return { current };
    case CLEAR_ERRORS:
      return { current: null };
    default:
      return state;
  }
}
