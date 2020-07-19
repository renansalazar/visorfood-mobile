import { FETCH_PLATOS, FETCH_PLATOS_SUCCESS, CREAR_PLATO, CREAR_PLATO_SUCCESS,
GET_PLATO, EDITAR_PLATO, EDITAR_PLATO_SUCCESS, EMPTY_PLATO } from './types';
import axios from 'axios';

export const fetchPlatos = (query) => dispatch => {
  dispatch({ type: FETCH_PLATOS });
  axios.get(`https://visorfood.herokuapp.com/api/plato/lista${query}`)
    //.then(rsp => rsp.json())
    .then(results => {
        dispatch({
            type: FETCH_PLATOS_SUCCESS,
            payload: results.data
        })
      }
    )
    
}

