import { useDispatch, useSelector } from 'react-redux';
import { TearDown } from '../../store/modal';
import { HideModal } from '../../store/UX';

import { ClearErrors } from '../../store/errors';

export default function Auth ({ onSubmit, children }) {
  const dispatch = useDispatch();

  const user = useSelector(state => state.session.user);

  if (user) {
    dispatch(TearDown());
    dispatch(HideModal());
  }

  const wrappedSubmit = e => {
    e.preventDefault();
    dispatch(ClearErrors());
    onSubmit();
  };

  return (
    <form
      onSubmit={wrappedSubmit}
      className='auth-form'
    >
      {children}
    </form>
  );
}
