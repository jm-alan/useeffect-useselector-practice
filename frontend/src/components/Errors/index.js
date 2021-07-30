import { useDispatch, useSelector } from 'react-redux';
import { ClearErrors } from '../../store/errors';

import './index.css';

export default function Errors () {
  const dispatch = useDispatch();

  const currentErrors = useSelector(state => state.errors.current);

  const onClose = () => dispatch(ClearErrors());

  return currentErrors && (
    <div id='error-bar'>
      {currentErrors}
      <button
        onClick={onClose}
        id='error-close'
      >
        X
      </button>
    </div>
  );
}
