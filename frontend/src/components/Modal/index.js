import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TearDown } from '../../store/modal';
import { HideModal } from '../../store/UX';

import './index.css';

export default function Modal () {
  const dispatch = useDispatch();

  const show = useSelector(state => state.UX.modal);
  const mooring = useSelector(state => state.modal.mooring);
  const Current = useSelector(state => state.modal.Current);

  const onClose = () => {
    dispatch(TearDown());
    dispatch(HideModal());
  };

  const resist = e => e.stopPropagation();

  return mooring && show && Current && createPortal(
    <div id='modal-background' onClick={onClose}>
      <div id='modal-content' onClick={resist}>
        <Current />
      </div>
    </div>,
    mooring
  );
}
