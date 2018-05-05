import { LANGUAGE_CHANGED} from '../actions/types';


const INITIAL_STATE = { langSelected : 'en' }

export default (state= INITIAL_STATE, action) => {
    
    switch(action.type){
        case LANGUAGE_CHANGED:
            return { ...state, langSelected: action.payload }
        default:
            return state;
    }
}