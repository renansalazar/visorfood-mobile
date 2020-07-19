import React from 'react'
import { ListItem, Left, Body, Right, Thumbnail, Text} from 'native-base';
import { useNavigation } from '@react-navigation/native';

export default ({restaurant}) => {
  
  const navigation = useNavigation()  
  
  const handleClick = () => {
    navigation.navigate('DetalleRestaurant',{ restaurant: restaurant.id })
  }

  return (
      <ListItem avatar onPress={handleClick}>
        <Left>
          <Thumbnail 
            style={{ backgroundColor: "#000000" }}
            source={{ uri: restaurant.logo }} />
        </Left>
        <Body>
          <Text>{ restaurant.nom }</Text>
          <Text note>{restaurant.direcciones.length>0? restaurant.direcciones[0].label:""}</Text>
        </Body>
        <Right>
          <Text note></Text>
        </Right>
      </ListItem>

    )
}