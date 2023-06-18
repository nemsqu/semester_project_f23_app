import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from "expo-constants";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChainInfo from './components/ChainInfo';

const Stack = createStackNavigator();

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

export default function App() {

  const [recieved, setRecieved] = useState({});

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
    const name = text.split("::")[1];
    const id = text.split("::")[0];
    console.log("data.id", text.id, "name", name)
    if(!text || fetching){
      console.log("Nope");
    }else{
      try{
        setFetching(true);
        console.log("Data here", name, id);
        //switch url to your own address created with localtunnel. "test_aau" is the index to be looked for in this case
        fetch("https://qr-code-server-2.loca.lt/api/messages/" + id)
        //fetch("https://qr-code-server-2.loca.lt/api/messages/test_aau")
        //fetch("https://qr-code.loca.lt/api/messages/aau_test_2")
        //fetch("https://cvrapi.dk/api?search=25313763&country=dk")
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

      {scanned && <Button
            title="Go to Info"
            onPress={() => {
              navigation.navigate('Info');
              fetchInfo();}}
          />}

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='white' />}
    </View>
    )
  }

  function FarmInfo({route, navigation}){
    const {actor} = route.params;
    console.log(actor)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Company name</Text>
        <Text>{actor.name}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Company address</Text>
        <Text>{actor.address}, {actor.city}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Feed</Text>
        <Text>{actor.feed}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>From {actor.feedorigin}</Text>
        <Text>{actor.feedorigin}</Text>
        {actor.cert && <CertificateInfo cert={actor.cert}></CertificateInfo>}
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  function TransportInfo({route, navigation}){
    const {actor} = route.params;
    console.log(actor)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Company name</Text>
        <Text>{actor.name}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Company address</Text>
        <Text>{actor.address}, {actor.city}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Transportation method</Text>
        <Text>{actor.method}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Distance {actor.feedorigin}</Text>
        <Text>{actor.distance}</Text>
        {actor.cert && <CertificateInfo cert={actor.cert}></CertificateInfo>}
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  function AbattoirInfo({route, navigation}){
    const {actor} = route.params;
    console.log(actor)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Company name</Text>
        <Text>{actor.name}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Company address</Text>
        <Text>{actor.address}, {actor.city}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Slaughter method</Text>
        <Text>{actor.method}</Text>
        {actor.cert && <CertificateInfo cert={actor.cert}></CertificateInfo>}
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  function ProcessingInfo({route, navigation}){
    const {actor} = route.params;
    console.log(actor)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Company name</Text>
        <Text>{actor.name}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Company address</Text>
        <Text>{actor.address}, {actor.city}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Packaging material</Text>
        <Text>{actor.packaging}</Text>
        {actor.cert && <CertificateInfo cert={actor.cert}></CertificateInfo>}
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  function RetailerInfo({route, navigation}){
    const {actor} = route.params;
    console.log(actor)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Company name</Text>
        <Text>{actor.name}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Company address</Text>
        <Text>{actor.address}, {actor.city}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Packaging material</Text>
        <Text>{actor.packaging}</Text>
        {actor.cert && <CertificateInfo cert={actor.cert}></CertificateInfo>}
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  function CertificateInfo({cert}){
    return (
      <View style={{justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontWeight: 'bold', marginBottom: 15, marginTop: 30}}>Certificate</Text>
        <Image
        style={{width: 40, height: 40}}
        source={{
          uri: 'https://qr-code-server-2.loca.lt/certified.jpg',
        }}
      />
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>Category</Text>
        <Text>{cert.product_category}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>Valid until</Text>
        <Text>{cert.Valid_until}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>Date of inspection</Text>
        <Text>{cert.Date_of_annual_inspection}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>Date of issuing</Text>
        <Text>{cert.Date_of_issuing}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>Place of issuing</Text>
        <Text>{cert.Place_of_issuing}</Text>
      </View>
    );
  }

  function Info({ navigation }) {

    const [js, setJS] = useState([{}]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      console.log(recieved, recieved.length);
      //const json = JSON.parse(recieved);
      setJS(recieved);
      console.log("JS", recieved.fetched, recieved.length);
      //console.log(json[0].did);
      if(recieved.fetched || recieved.length > 1){
        console.log("Data received");
        console.log(recieved.length);

        console.log(recieved);
        setLoading(false);
      }
    }, [recieved]);

    const onClickFarm= (actor) => {
      navigation.navigate('Farm Info', {actor: actor});
    };
    const onClickTransport= (actor) => {
      navigation.navigate('Transport Info', {actor: actor});
    };
    const onClickAbattoir= (actor) => {
      navigation.navigate('Abattoir Info', {actor: actor});
    };

    const onClickProcessing= (actor) => {
      navigation.navigate('Processing Info', {actor: actor});
    };

    const onClickRetailer= (actor) => {
      navigation.navigate('Retailer Info', {actor: actor});
    };


    console.log("loading", loading, "fetched", recieved.fetched)
    return (loading === true ? <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Fetching information...</Text>
      </View>
      </> : recieved.fetched ? <>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{recieved.error}</Text>
        <Button title="Try again" onPress={() => navigation.goBack()} />
      </View>
      </> :
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{fontWeight: 'bold', marginBottom: 5}}>Origin</Text>
        <Text style={{marginBottom: 20}}>{js[0].city}</Text>
        <Text style={{fontWeight: 'bold', marginBottom: 10}}>Supply Chain</Text>
        <ChainInfo name={js[0].name} onClick={() => onClickFarm(js[0])}></ChainInfo>
        <ChainInfo name={js[1].name} onClick={() => onClickTransport(js[1])}></ChainInfo>
        <ChainInfo name={js[2].name} onClick={() => onClickAbattoir(js[2])}></ChainInfo>
        <ChainInfo name={js[3].name} onClick={() => onClickTransport(js[3])}></ChainInfo>
        <ChainInfo name={js[4].name} onClick={() => onClickProcessing(js[4])}></ChainInfo>
        <ChainInfo name={js[5].name} onClick={() => onClickTransport(js[5])}></ChainInfo>
        <ChainInfo name={js[6].name} onClick={() => onClickRetailer(js[6])}></ChainInfo>
        <Text style={{fontWeight: 'bold', marginVertical: 10}}>Total distance travelled</Text>
        <Text style={{marginBottom: 10}}>{js[1].distance + js[3].distance + js[5].distance}km</Text>
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
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
          }}
        />
        <Stack.Screen
          name="Info"
          component={Info}
        />
        <Stack.Screen
          name="Farm Info"
          component={FarmInfo}
        />
        <Stack.Screen
          name="Transport Info"
          component={TransportInfo}
        />
        <Stack.Screen
          name="Abattoir Info"
          component={AbattoirInfo}
        />
        <Stack.Screen
          name="Processing Info"
          component={ProcessingInfo}
        />
        <Stack.Screen
          name="Retailer Info"
          component={RetailerInfo}
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