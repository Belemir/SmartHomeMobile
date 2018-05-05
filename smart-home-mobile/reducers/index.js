import { combineReducers } from 'redux';
import LanguageReducer from './LanguageReducer'

export default combineReducers({
    lang: LanguageReducer
});