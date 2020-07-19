import React, {Fragment, useEffect} from 'react'
import { ImageBackground, ScrollView, Linking } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Content, Thumbnail, Text, Button, Item, List, Label, H2, Input, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { fetchPlatos } from '../../redux/actions/platoActions'
import { getRestaurant } from '../../redux/actions/restaurantActions'
import Plato from '../../components/Plato'

export default ({navigation, route}) => {
  const dispatch = useDispatch()
  const restaurant_id = route.params.restaurant
  const platos = useSelector((state)=>state.plato.items.items)
  const loading = useSelector((state)=>state.plato.items.loading)
  const restaurant = useSelector((state)=>state.restaurant.item.item)
  const loading_r = useSelector((state)=>state.restaurant.item.loading)
  
  useEffect(()=>{
    dispatch(getRestaurant(restaurant_id))
    dispatch(fetchPlatos(`?restaurant_id=${restaurant_id}`))
  },[])

  const handleLlamar = (nro) => {
    Linking.openURL(`tel:${nro}`)
  }

  const handleAbrir = (web) => {
    Linking.openURL(web)
  }

  return (
    <Container>
      <Grid>
        <ScrollView>
          <Row style={styles.restaurantContainer}>
            {
              restaurant==null?
                <Spinner color='blue' />
              :
                <ImageBackground style={styles.image} source={ restaurant.portada==null ? require('../../assets/bg-food4.jpg') : {uri:restaurant.portada} } >
                  <Thumbnail large source={{uri: restaurant.logo}} style={styles.logo} />
                  <H2 style={styles.titulo}>{restaurant.nom}</H2>
                  <Text style={styles.titulo}>{restaurant.desc}</Text>
                  <Text style={styles.titulo}>{restaurant.direcciones? restaurant.direcciones[0].label : ""}</Text>
                  
                    {
                      restaurant.telefonos.length>0 ?
                        restaurant.telefonos.split("|").map(x=>{
                          return (
                            <Button style={styles.button} onPress={()=>{handleLlamar(x)}}>
                              <Text>{x}</Text>
                            </Button>
                          )
                        })
                      :
                        <Text></Text>
                    }
                    {
                      restaurant.urls.length>0?
                        restaurant.urls.split("|").map(x=>{
                          return (
                            <Button style={styles.button} onPress={()=>{handleAbrir(x)}} >
                              <Text>{x}</Text>
                            </Button>
                          )
                        })
                      :
                        <Text></Text>
                    }
                  
                </ImageBackground>
            }
          </Row>
        
          <Row>
              {
                loading?
                  <Spinner style={styles.containerSub} color='blue' />
                :          
                  <List style={styles.containterPlatos}>
                    <H2 style={styles.titulo} >Resultado</H2>
                    {
                      platos.map((x,i)=>{
                        return <Plato key={i} plato={x} /> 
                      })
                    }
                  </List>
              }
          </Row>
        </ScrollView>
      </Grid>
    </Container>
  ) 

}

const styles = {
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems : "center",
  },
  titulo: {
    color: "#FFFFFF",
    textShadowColor: 'rgba(0, 0, 0, )',
    textShadowOffset: {width: -1, height: 1},
    marginBottom: 6,
  },
  restaurantContainer:{
  },
  logo: {
    margin: 6,
    backgroundColor: "#000000",
  },
  button: {
    marginBottom: 6,
  },
  containterPlatos: {
    width: "100%"
  },
  containerSub: {
    alignItems : "center",
    width: "100%"
  }
}