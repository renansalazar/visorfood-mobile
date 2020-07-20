import React,{useState,useEffect, Fragment} from 'react'
import {ScrollView} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Spinner } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

import { fetchRestaurants } from '../../redux/actions/restaurantActions'
import Restaurant from '../../components/Restaurant'

export default ({navigation}) => {
  const dispatch = useDispatch()
  const restaurantes = useSelector((state)=>state.restaurant.items.items)
  const loading = useSelector((state)=>state.restaurant.loading)

  useEffect(()=>{
    dispatch(fetchRestaurants(''))
  },[]) 
  
  return (
      <Container>
        <Grid>
          <ScrollView>
            <Col>
              {
                loading?
                  <Spinner style={styles.containerList} color='blue' />
                :
                  <List>
                    {
                      restaurantes.map((x,i)=>{
                        return <Restaurant key={i} restaurant={x} /> 
                      })
                    }
                  </List>
              }  
            </Col>
          </ScrollView>
        </Grid>
      </Container>
    );
}

const styles = {
  containerList: {
    alignItems: "center",
    width: "100%"
  }
}