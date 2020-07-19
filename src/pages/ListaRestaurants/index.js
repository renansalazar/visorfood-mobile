import React,{useState,useEffect, Fragment} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Spinner } from 'native-base';

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
        <Fragment>
          {
            loading?
              <Spinner color='blue' />
            :
              <List>
                {
                  restaurantes.map((x,i)=>{
                    return <Restaurant key={i} restaurant={x} /> 
                  })
                }
              </List>
          }  
        </Fragment>
      </Container>
    );
}