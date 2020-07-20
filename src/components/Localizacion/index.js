import React, { useState, useEffect } from 'react'
import { View, AsyncStorage } from 'react-native'
import { Container, Header, Content, Item, Picker, Form, H3, Button, Text } from "native-base";

export default ({navigation, route}) => {
  const [selected, setSelected] = useState('Jesus Maria')

  useEffect(()=>{
    AsyncStorage.getItem('localidad', (err, rsp)=>{
      if(rsp!=null){
        setSelected(rsp)
      }
    })
  },[])

  const handleCancelar = () => {
    navigation.goBack()
  }

  const handleAceptar = () => {
    if(selected != ''){
      AsyncStorage.setItem("localidad", selected);
      navigation.goBack()
      route.params.onGoBack()
    }
  }

  return (
    <Container style={styles.containerForm}>
          <Form style={styles.form}>
            <H3>Localidad</H3>
            <Picker
              note
              mode="dropdown"
              style={{ width: "100%" }}
              selectedValue={selected}
              onValueChange={(e)=>{ setSelected(e)} }
            >
              <Picker.Item label="Jesus Maria" value="Jesus Maria" />
              <Picker.Item label="Breña" value="Breña" />
              <Picker.Item label="Pueblo Libre" value="Pueblo Libre" />
            </Picker>
            <View style={styles.containerBoton}>
              <Button onPress={handleCancelar} rounded light>
                <Text>Cancelar</Text>
              </Button>
              <Button onPress={handleAceptar} rounded primary>
                <Text>Aceptar</Text>
              </Button>
            </View>
          </Form>
      </Container>
  )
}

const styles = {
  containerForm: {
    justifyContent:'center',
    alignItems:'center'
  },
  form: {
    height: 200,
    width: 200
  },
  containerBoton: {
    flexDirection:'row', 
    flexWrap:'wrap'
  }
}