import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from "expo-constants";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

export default function App() {

  const [recieved, setRecieved] = useState('Not yet scanned');

  function Splash({ navigation }) {

    useEffect(() => {
      setTimeout(() => {
          navigation.replace('Home');
      }, 2000);
    }, []);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home screen</Text>
      </View>
    );
  }

  function Home({ navigation }) {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

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
    try{
      //switch url to your own address created with localtunnel. "test_aau" is the index to be looked for in this case
      fetch("https://qr-code-server-2.loca.lt/api/messages/aau_test_2")
      //fetch("https://qr-code-server-2.loca.lt/api/messages/test_aau")
      //fetch("https://qr-code.loca.lt/api/messages/aau_test_2")
      //fetch("https://cvrapi.dk/api?search=25313763&country=dk")
      .then(response => {
        console.log("done");
        return response.json()
      }).then(data => {console.log(data), setRecieved(JSON.stringify(data))});
    }catch (error){
      console.log(error)
    }
  };

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

      {scanned && <Button
            title="Go to Info"
            onPress={() => navigation.navigate('Info')}
          />}

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='white' />}
    </View>
    )
  }

  function Info({ navigation }) {

    const [js, setJS] = useState([{}]);

    useEffect(() => {
      //console.log(recieved);
      const json = JSON.parse(recieved);
      setJS(json);
      console.log(json[0].did);
    }, []);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Info screen</Text>
        <Text>{js[0].did}</Text>
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  // Return the View
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='Splash'
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: 'tomato' },
          }}
        />
        <Stack.Screen
          name="Info"
          component={Info}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});