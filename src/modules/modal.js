import { createAction, handleActions } from 'redux-actions';

// action type
const OPEN_MODAL = 'modal/OPEN_MODAL';
const CLOSE_MODAL = 'modal/CLOSE_MODAL';

// action creator
export const openModal = createAction(OPEN_MODAL); // index
export const closeModal = createAction(CLOSE_MODAL);

// initial state
const initialState = {
  isOpenModal: false,
  session: null,
};

// reducer
export default handleActions({
  [OPEN_MODAL]: (state, action) =>
    ({
      ...state,
      isOpenModal: true,
      session: action.payload,
    }),
  [CLOSE_MODAL]: (state, action) => ({ ...state, isOpenModal: false })
}, initialState)