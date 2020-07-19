import React from 'react'
import { Image, TouchableOpacity } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body } from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default ({plato}) => {
  
  const navigation = useNavigation()  
  
  const formatoPrecio = (num) => {
     return 'S/ '+ num.toFixed(2)
  }
  
  const handleRestaurant = () => {
    navigation.navigate('DetalleRestaurant',{ restaurant: plato.restaurant })
  }

  return (
      <Card style={{flex: 0}}>
        <CardItem>
          <Left >
            <Button transparent onPress={handleRestaurant}>  
              <Thumbnail  
                style={{ backgroundColor: "#000000" }}
                source={{uri: plato.logo_restaurant}} 
              />
            </Button>
            <Body onPress={handleRestaurant}>
              <Text onPress={handleRestaurant}>{ plato.nom_restaurant }</Text>
              <Text onPress={handleRestaurant} note>{ plato.direcciones.length>0 ? plato.direcciones[0].label : ""}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem>
          <Body>
            <Image source={{uri: plato.imagen}} style={{height: 200, width: "100%"}}/>
            <Text>
             {plato.nom}
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Text>{formatoPrecio(plato.precio)}</Text>
          </Left>
        </CardItem>
      </Card>
    )
}