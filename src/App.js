/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import 'react-native-gesture-handler';
import { Button, Icon, Text } from 'native-base'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import { Provider } from 'react-redux';

import store from './redux/store';
import Home from './pages/Home'
import Results from './pages/Results'
import ListaRestaurants from './pages/ListaRestaurants'
import DetalleRestaurant from './pages/DetalleRestaurant'
import Localizacion from './components/Localizacion'

const Stack = createStackNavigator();
/*<HeaderBackButton
  {...props}
  onPress={() => {
    // Do something
  }}
/>*/

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{
              title: 'VisorFood',
            }}
          />
          <Stack.Screen 
            name="ListaRestaurants" 
            component={ListaRestaurants} 
            options={{
              title: 'Restaurantes',
            }}
          />
          <Stack.Screen 
            name="DetalleRestaurant" 
            component={DetalleRestaurant} 
            options={{
              title: 'Detalle',
            }}
          />
          <Stack.Screen 
            name="Results" 
            component={Results} 
            options={{
              title: 'Resultados',
            }}
          />
          <Stack.Screen 
            name="Localizacion" 
            component={Localizacion} 
            options={{
              title: 'Seleccione localidad',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
