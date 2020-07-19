import { FETCH_RESTAURANTS, FETCH_RESTAURANTS_SUCCESS, CREAR_RESTAURANT, CREAR_RESTAURANT_SUCCESS, 
    GET_RESTAURANT, GET_RESTAURANT_ERROR, EDITAR_RESTAURANT,EDITAR_RESTAURANT_SUCCESS, EMPTY_RESTAURANT } from '../actions/types';

const initialState = {
    items: { items: [], error: null, loading: false },
    item: { item: null, error: null, loading: false },
    crear: false
};
export default function(state = initialState, action) {
    switch(action.type){
        case FETCH_RESTAURANTS:
            return {
                 ...state, 
                 items: { items:state.items.items, error: state.items.error, loading: true}
             }
        case FETCH_RESTAURANTS_SUCCESS:
            return {
                ...state, 
                items: {items:action.payload, error: state.items.error, loading: false }
            }
        case EMPTY_RESTAURANT:
            return {
                ...state, 
                item: {item: null, error:null, loading: false}
            }
        case CREAR_RESTAURANT:
            return { 
                ...state, 
                item: { item:state.item.item, error: null, loading: true}, 
                crear:true
            }
        case GET_RESTAURANT:
            return {
                ...state, 
                item: { item:action.payload, error: null, loading: true}, 
                crear:true
            }
        case GET_RESTAURANT_ERROR:
            return { 
                ...state, 
                item: { item:null, error: action.payload, loading: true}, 
                crear:true
            }
        case CREAR_RESTAURANT_SUCCESS:
            return { 
                ...state, 
                item: { item:action.payload, error: null, loading: false}, 
                crear:false
            }
        case EDITAR_RESTAURANT_SUCCESS:
            return { 
                        ...state, 
                        item: { item:action.payload, error: null, loading: false}, 
                        crear:false
                    }
        default:
            return state
    }
}