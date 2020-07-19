import { combineReducers } from  'redux';

import restaurantReducer from './restaurantReducer';
import platoReducer from './platoReducer';
import mensajeReducer from './mensajeReducer';

export default combineReducers({
    restaurant: restaurantReducer,
    plato: platoReducer,
    mensaje: mensajeReducer,
})