import { LANGUAGE_CHANGED } from './types';


export const languageChanged = lang => {
    return{
        type: LANGUAGE_CHANGED,
        payload: lang
    }
}