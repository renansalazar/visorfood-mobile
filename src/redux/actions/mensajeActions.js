import { CREAR_MENSAJE, CREAR_MENSAJE_SUCCESS, CREAR_MENSAJE_FAILED } from './types';
import axios from 'axios';

export const crearMensaje = (obj) => dispatch => {
  console.log("si entra", obj)
  dispatch({ type: CREAR_MENSAJE });
  axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.withCredentials = true;
  axios.post("https://visorfood.herokuapp.com/api/mensaje/lista",{
    nombre: obj.nombre,
    email: obj.email,
    mensaje: obj.mensaje
  })
    //.then(rsp => rsp.json())
    .then(results => {
        dispatch({
            type: CREAR_MENSAJE_SUCCESS,
            payload: results.data
        })
      }
    ).catch(function (error) {
      console.log(error)
      dispatch({
          type: CREAR_MENSAJE_FAILED,
          payload: error
      })
    })
    
}

