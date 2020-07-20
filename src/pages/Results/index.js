import React, { Fragment, useState, useEffect, useLayoutEffect } from 'react'
import { ScrollView, AsyncStorage, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Content, List, ListItem, Card, CardItem, Left, Body, Right, Thumbnail, Button, Text, Spinner, H2 } from 'native-base';
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
              {
                platos.length>0?
                  <Fragment>
                    <H2 style={styles.titulo} >Resultado</H2>
                    {
                      platos.map((x,i)=>{
                        return <Plato key={i} plato={x} /> 
                      })
                    }
                  </Fragment>
                :
                <Card>
                  <CardItem>
                    <Body>
                      <Text>
                        No se encontraron platos.
                      </Text>
                    </Body>
                  </CardItem>
                </Card>
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
              {
                restaurantes.length>0?
                  <Fragment>
                    <H2 style={styles.titulo} >Resultado</H2>
                    {
                      restaurantes.map((x,i)=>{
                        return <Restaurant key={i} restaurant={x} /> 
                      })
                    }
                  </Fragment>
                :
                  <Card>
                    <CardItem>
                      <Body>
                        <Text>
                          No se encontraron restaurantes
                        </Text>
                      </Body>
                    </CardItem>
                  </Card>
              }
            </List>
        }
      </Fragment>
    </Container>
  )
}

function IconWithBadge({ name, badgeCount, color, size }) {
  return (
    <View style={{ width: 24, height: 24, margin: 5 }}>
      <Icon name={name} size={size} color={color} />
      {badgeCount > 0 && (
        <View
          style={{
            // On React Native < 0.57 overflow outside of parent will not work on Android, see https://git.io/fhLJ8
            position: 'absolute',
            right: -6,
            top: -3,
            backgroundColor: 'red',
            borderRadius: 6,
            width: 12,
            height: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
            {badgeCount}
          </Text>
        </View>
      )}
    </View>
  );
}

function PlatoIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  const platos = useSelector((state)=>state.plato.items.items)
  return <IconWithBadge {...props} badgeCount={platos.length} />;
}

function RestaurantIconWithBadge(props) {
  // You should pass down the badgeCount in some other ways like React Context API, Redux, MobX or event emitters.
  const restaurantes = useSelector((state)=>state.restaurant.items.items)
  return <IconWithBadge {...props} badgeCount={restaurantes.length} />;
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
              return (
                <RestaurantIconWithBadge
                  name={iconName}
                  size={size}
                  color={color}
                />
              )
              //<Icon name={iconName} size={size} color={color} />;
            } else if (route.name === 'Plato') {
              iconName = focused ? 'restaurant-outline' : 'restaurant-outline';
              return (
                <PlatoIconWithBadge
                  name={iconName}
                  size={size}
                  color={color}
                />
              )
              //<Icon name={iconName} size={size} color={color} />;
            }

            // You can return any component that you like here!
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