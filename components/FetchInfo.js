import React, { useState, useEffect } from 'react';
import { Text, View, Button, Pressable, TouchableOpacity } from 'react-native';
import { styles } from '../styles/Styles';
import { ProductInfo } from '../screens/ProductInfo';
import { setScanned } from '../redux/actions';
import { useDispatch } from "react-redux";

export function FetchInfo({ navigation, text}) {

    const [loading, setLoading] = useState(true);
    const [recieved, setRecieved] = useState(null);
    const dispatch = useDispatch();

    const fetchData = () => {
      if(!text){
        console.log("Nope");
      }else{
        try{
          fetch("http://192.168.1.36:3000/api/product/" + text)
          .then(response => {
            return response.json()
          })
          .then(data => { setRecieved(data), setLoading(false)});
        } catch (error){
          console.log(error)
        }
      }
    }

    useEffect(() => {
      fetchData();
    }, [])

  
    useEffect(() => {
      if(recieved !== null){
        setLoading(false);
        if(!recieved.error){
          navigation.navigate("Info", {data: recieved})
        } else {
          console.log("error:", recieved)
        }
      }
    }, [recieved]);
  
    return (loading === true ? <>
      <View style={styles.container}>
        <Text>Fetching information...</Text>
      </View>
      </> : recieved.error ? <>
      <View style={styles.container}>
        <Text>{recieved.error}</Text>
        <Button title="Try again" onPress={() => {dispatch(setScanned(false))}} />
      </View>
      </> :
      <></>
    );
  }