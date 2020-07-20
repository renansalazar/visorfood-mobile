import React, { useState, useLayoutEffect, Fragment } from 'react'
import { ImageBackground, AsyncStorage } from 'react-native'
import { Container, Content, Thumbnail, Text, Button, Item, Label, H2, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';


export default ({navigation}) => {

  const [searchText, setSearchText] = useState('')

  useLayoutEffect(() => {
    //AsyncStorage.removeItem('localidad')
    navigation.setOptions({
      headerRight: () => (
        <Button 
          onPress={() => navigation.navigate('ListaRestaurants')}
          transparent>
          <Text>Restaurantes</Text>
        </Button>
      ),
    });
  }, []);
  
  const refresco = () => {
    //alert("selected")
    navigation.navigate('Results', { searchText })
  }

  const handleSearch = () => {
    if(searchText.length>0){
      AsyncStorage.getItem('localidad', (err, rsp)=>{
        if(rsp==null){
          navigation.navigate('Localizacion',{
                              onGoBack: refresco,
                            })
        }else{
          refresco()
        }
      })
    }
    //AsyncStorage.setItem("localidad", JSON.stringify(producto));
  }

  return (
    <Container>
      <ImageBackground style={styles.image} source={require('../../assets/bg-food2.jpg')} >
        <Grid >
          <Row>
          </Row>
          <Row >
            <Col>
              <H2 style={styles.titulo}>Busca los mejores potajes y Restaurantes de Lima</H2>
              <Item floatingLabel style={styles.searchContainer}>
                <Label style={styles.subtitulo}>  Ingrese un Plato o Restaurante</Label>
                <Input 
                  style={styles.search}
                  value={searchText}
                  onChangeText={(text) => setSearchText(text)}
                  onSubmitEditing={() => handleSearch()} 
                  returnKeyType="search"
                />
              </Item>
            </Col>
          </Row>
          <Row>
          </Row>
        </Grid>
      </ImageBackground>
    </Container>
  )
}

const styles = {
  image: {
    flex: 1
  },
  searchContainer: {
    marginRight:20,
    marginLeft:20
  },
  titulo: {
    color: "#FFFFFF",
    textAlign: "center",
    textShadow: "2px 2px #535353",
    marginBottom:10

  },
  subtitulo:{
    textShadow: "2px 2px #535353",
    color: "#FFFFFF",
  },
  search: {
    color: "#000000",
    marginTop: 6,
    backgroundColor: "#ffffff7a",
  }
}