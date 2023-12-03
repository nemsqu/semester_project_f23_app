import React, { useState, useEffect } from 'react';
import { Text, View, Button, Pressable, TouchableOpacity } from 'react-native';
import { styles } from '../styles/Styles';
import { ProductInfo } from './ProductInfo';

export function FetchInfo({ navigation , route}) {

    const [js, setJS] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const {recieved} = route.params;
  
    useEffect(() => {
      console.log("haettu:", recieved, recieved.length);
      //const json = JSON.parse(recieved);
      setJS(recieved);
      console.log("JS", recieved.fetched, recieved.length);
      //console.log(json[0].did);
      if(recieved){
        console.log("Data received");
        console.log(recieved.length);
  
        console.log(recieved);
        setLoading(false);
      }
    }, [recieved]);
  
    console.log("loading", loading, "fetched", recieved.fetched)
    return (loading === true ? <>
      <View style={styles.container}>
        <Text>Fetching information...</Text>
      </View>
      </> : recieved.error ? <>
      <View style={styles.container}>
        <Text>{recieved.error}</Text>
        <Button title="Try again" onPress={() => {navigation.navigate('Home');}} />
      </View>
      </> :
      <View style={styles.container}>
        <ProductInfo />
      </View>
    );
  }