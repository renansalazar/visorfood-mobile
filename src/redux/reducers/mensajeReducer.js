import { CREAR_MENSAJE, CREAR_MENSAJE_SUCCESS, CREAR_MENSAJE_FAILED } from '../actions/types';

const initialState = {
    item: { item: null, error: null, loading: false },
};
export default function(state = initialState, action) {
    switch(action.type){
        case CREAR_MENSAJE:
            return {
                 ...state, 
                 item: { item:null, error: null, loading: true}
             }
        case CREAR_MENSAJE_SUCCESS:
            return {
                ...state, 
                item: {item:action.payload, error: null, loading: false }
            }
        case CREAR_MENSAJE_FAILED:
            return {
                ...state, 
                item: {item: null, error:action.payload, loading: false}
            }
        default:
            return state
    }
}