import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, Pressable, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { styles } from '../styles/Styles';
import { FetchInfo } from '../components/FetchInfo';
import { setScanned } from '../redux/actions';
import { useDispatch, useSelector } from "react-redux";

export function Home({ navigation }) {

  const { scanned } = useSelector(state => state.scanReducer);
    const dispatch = useDispatch();
    const [recieved, setRecieved] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [text, setText] = useState('Not yet scanned');
    const [fetching, setFetching] = useState(false);
  
    const askForCameraPermission = () => {
      (async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      })()
    }
  
    // Request Camera Permission
    useEffect(() => {
      askForCameraPermission();
      dispatch(setScanned(false));
    }, []);
  
    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
      dispatch(setScanned(true));
      setText(data)
      fetchInfo()
    };
  
    const fetchInfo = () => {
      if(!text || fetching){
        console.log("Nope");
      }else{
        try{
          setFetching(true);
          fetch("http://192.168.1.36:3000/api/product/" + text)
          .then(response => {
            return response.json()
          })
          .then(data => {console.log(data), setRecieved(data)})
          .then(setFetching(false));
        }catch (error){
          console.log(error)
        }
      }
    }
  
    // Check permissions and return the screens
    if (hasPermission === null) {
      return (
        <View style={styles.container}>
          <Text>Requesting for camera permission</Text>
        </View>)
    }
    if (hasPermission === false) {
      return (
        <View style={styles.container}>
          <Text style={{ margin: 10 }}>No access to camera</Text>
          <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
        </View>)
    }
  
      return (
        <View style={styles.container}>
          {scanned ? <FetchInfo text={text} navigation={navigation} /> : <View style={styles.barcodebox}>
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{ height: 400, width: 400 }} />
          </View>}
      </View>
      )
    }