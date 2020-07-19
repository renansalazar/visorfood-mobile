import { FETCH_RESTAURANTS, FETCH_RESTAURANTS_SUCCESS, CREAR_RESTAURANT, CREAR_RESTAURANT_SUCCESS, 
    GET_RESTAURANT, GET_RESTAURANT_ERROR, EDITAR_RESTAURANT,EDITAR_RESTAURANT_SUCCESS, EMPTY_RESTAURANT } from './types';
import axios from 'axios';

export const fetchRestaurants = (query) => dispatch => {
  dispatch({ type: FETCH_RESTAURANTS });
  axios.get(`https://visorfood.herokuapp.com/api/restaurant/lista${query}`)
    //.then(rsp => rsp.json())
    .then(results => {
        dispatch({
            type: FETCH_RESTAURANTS_SUCCESS,
            payload: results.data
        })
      }
    )
    
}

export const getRestaurant = (restaurantId) => dispatch => {
  axios.get(`https://visorfood.herokuapp.com/api/restaurant/get/${restaurantId}/`)
    .then(results => {
        dispatch({
            type: GET_RESTAURANT,
            payload: results.data
        })
      }
    ).catch(function (error) {
      dispatch({
          type: GET_RESTAURANT_ERROR,
          payload: error
      })
    })
}

