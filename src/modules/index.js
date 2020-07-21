import { combineReducers } from 'redux';
import locale from './locale';
import modal from './modal'

export default combineReducers({
  locale,
  modal
});