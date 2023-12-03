import React, { useState, useEffect } from 'react';
import { Text, View, Button, Image, Pressable, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { styles } from '../styles/Styles';

export function Home({ navigation }) {

    const [recieved, setRecieved] = useState({});
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
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
    }, []);
  
    // What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      setText(data)
      console.log('Type: ' + type + '\nData: ' + data)
    };
  
    const fetchInfo = () => {
      console.log("data", text)
      if(!text || fetching){
        console.log("Nope");
      }else{
        try{
          setFetching(true);
          console.log("Data here", text);
          //switch url to your own address created with localtunnel. "test_aau" is the index to be looked for in this case
          //fetch("https://qr-code.loca.lt/api/messages/" + text)
          fetch("http://192.168.1.36:3000/api/" + text)
          .then(response => {
            console.log("done");
            return response.json()
          }).then(data => {console.log(data), setRecieved(data)})
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
        <View style={styles.barcodebox}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ height: 400, width: 400 }} />
        </View>
        <Text style={styles.maintext}>{text}</Text>
  
        {scanned && <Pressable
              style={styles.button}
              onPress={() => {
                navigation.navigate('Info', {recieved: recieved,});
                fetchInfo();}}
            >
              <Text style={{color: 'white'}}>Get info</Text>
              </Pressable>}
  
              {scanned && <Button title={'Scan again?'} onPress={() => {setScanned(false); setText("Not yet scanned");}} color='black' />}
      </View>
      )
    }