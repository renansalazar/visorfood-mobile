import { FETCH_PLATOS, FETCH_PLATOS_SUCCESS, CREAR_PLATO, CREAR_PLATO_SUCCESS,
GET_PLATO, EDITAR_PLATO, EDITAR_PLATO_SUCCESS, EMPTY_PLATO } from '../actions/types';

const initialState = {
    items: { items: [], error: null, loading: false },
    item: { item: null, error: null, loading: false },
    crear: false
};
export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_PLATOS:
            return {
                 ...state, 
                 items: { items:state.items.items, error: state.items.error, loading: true}
             }
        case FETCH_PLATOS_SUCCESS:
            return {
                ...state, 
                items: {items:action.payload, error: state.items.error, loading: false }
            }
        case EMPTY_PLATO:
            return {
                ...state, 
                item: {item: null, error:null, loading: false}
            }
        case CREAR_PLATO:
            return { 
                ...state, 
                item: { item:state.item.item, error: null, loading: true}, 
                crear:true
            }
        case CREAR_PLATO_SUCCESS:
            return { 
                ...state, 
                item: { item:action.payload, error: null, loading: false}, 
                crear:false
            }
        case EDITAR_PLATO_SUCCESS:
            return { 
                        ...state, 
                        item: { item:action.payload, error: null, loading: false}, 
                        crear:false
                    }
        default:
            return state
    }
}