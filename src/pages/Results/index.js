import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react'
import { ScrollView, AsyncStorage } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Button, Text, Spinner, H2 } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useRoute, useNavigation } from '@react-navigation/native';
//import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Ionicons';

import { fetchRestaurants } from '../../redux/actions/restaurantActions'
import { fetchPlatos } from '../../redux/actions/platoActions'
import Restaurant from '../../components/Restaurant'
import Plato from '../../components/Plato'


const PlatoScreen = () => {
  const platos = useSelector((state)=>state.plato.items.items)
  const loading = useSelector((state)=>state.plato.items.loading)

  return (
    <Container>
      <ScrollView>
        {
          loading?
            <Spinner color='blue' />
          :          
            <List>
              <H2 style={styles.titulo} >Resultado</H2>
              {
                platos.map((x,i)=>{
                  return <Plato key={i} plato={x} /> 
                })
              }
            </List>
        }
      </ScrollView>
    </Container>
  )
}


const RestaurantScreen = () => {
  const restaurantes = useSelector((state)=>state.restaurant.items.items)
  const loading = useSelector((state)=>state.restaurant.items.loading)

  return (
    <Container>
      <Fragment>
        {
          loading?
            <Spinner color='blue' />
          :          
            <List>
              <H2 style={styles.titulo} >Resultado</H2>
              {
                restaurantes.map((x,i)=>{
                  return <Restaurant key={i} restaurant={x} /> 
                })
              }
            </List>
        }
      </Fragment>
    </Container>
  )
}

const Tab = createBottomTabNavigator();

export default ({navigation, route}) => {
  const dispatch = useDispatch()
  const searchText = route.params.searchText

  const refresco = () => {
    AsyncStorage.getItem('localidad', (err, rsp)=>{
      if(rsp!=null){
        const localidad = rsp
        dispatch(fetchRestaurants(`?q=${searchText}&localidad=${localidad}`))
        dispatch(fetchPlatos(`?q=${searchText}&localidad=${localidad}`))
        navigation.setOptions({
          headerRight: () => (
            <Button 
              onPress={() => navigation.navigate('Localizacion', {
                              onGoBack: refresco,
                            })}
              transparent>
              <Text>{localidad}</Text>
            </Button>
          ),
        });
      }
    })
  }

  useLayoutEffect(() => {
    refresco()
  }, []);

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName='facebook';

            if (route.name === 'Restaurant') {
              iconName = focused? 'ios-home-outline' : 'ios-home-outline';
            } else if (route.name === 'Plato') {
              iconName = focused ? 'restaurant-outline' : 'restaurant-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Restaurant" component={RestaurantScreen} options={{title: "Restaurante"}} />
        <Tab.Screen name="Plato" component={PlatoScreen} />
      </Tab.Navigator>
  );
}

const styles = {
  titulo: {
    margin: 10
  }

}