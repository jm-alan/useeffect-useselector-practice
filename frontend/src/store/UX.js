const SHOW_MODAL = 'UX/modal/SHOW';
const HIDE_MODAL = 'UX/modal/HIDE';

export const ShowModal = () => ({
  type: SHOW_MODAL
});

export const HideModal = () => ({
  type: HIDE_MODAL
});

export default function reducer (
  state = { modal: false },
  { type }
) {
  switch (type) {
    case SHOW_MODAL:
      return { ...state, modal: true };
    case HIDE_MODAL:
      return { ...state, modal: false };
    default:
      return state;
  }
}
