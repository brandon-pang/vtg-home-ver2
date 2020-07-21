import { createAction, handleActions } from 'redux-actions';
import detectBrowserLanguage from 'detect-browser-language';
// action type
const CHANGE_LANG = 'locale/CHANGE_LANG';

// action creator
export const changeLang = createAction(CHANGE_LANG);

// initial state
const initialState = {
  lang: detectBrowserLanguage() //English, Korean
};

// reducer
export default handleActions({
  [CHANGE_LANG]: (state, action) => ({
    ...state,
    lang: action.payload
  })
}, initialState)