import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, Pressable, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from "expo-constants";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ChainInfo from './components/ChainInfo';
import Timeline from 'react-native-timeline-flatlist';

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

      {scanned && <Pressable
            style={styles.button}
            onPress={() => {
              navigation.navigate('Info', {name: text.split("::")[1]});
              fetchInfo();}}
          >
            <Text style={{color: 'white'}}>Get info</Text>
            </Pressable>}

            {scanned && <Button title={'Scan again?'} onPress={() => {setScanned(false); setText("Not yet scanned");}} color='black' />}
    </View>
    )
  }

  function FarmInfo({route, navigation}){
    const {actor} = route.params;
    console.log(actor)
    return (
      <View style={{ flex: 1, marginHorizontal: 10}}>
        <Text style={styles.sectionTitle}>Company name</Text>
        <Text>{actor.name}</Text>
        <Text style={styles.sectionTitle}>Company address</Text>
        <Text>{actor.address}, {actor.city}</Text>
        <Text style={styles.sectionTitle}>Feed</Text>
        <Text>{actor.feed}</Text>
        <Text style={styles.sectionTitle}>From {actor.feedorigin}</Text>
        <Text>{actor.feedorigin}</Text>
        {actor.cert && <View style={{marginTop: 20 }} >
          <Text style={styles.sectionTitle}>Certificate</Text>
          <Pressable onPress={() => navigation.navigate('Certificate Info', {cert: actor.cert})}>
            <Image style={{width: 40, height: 40}}
              source={{
                uri: 'https://qr-code-server-2.loca.lt/certified.jpg',
              }}
            />  
          </Pressable>
        </View>
        }
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  function TransportInfo({route, navigation}){
    const {actor} = route.params;
    console.log(actor)
    return (
      <View style={{ flex: 1, marginHorizontal: 10}}>
        <Text style={styles.sectionTitle}>Company name</Text>
        <Text>{actor.name}</Text>
        <Text style={styles.sectionTitle}>Company address</Text>
        <Text>{actor.address}, {actor.city}</Text>
        <Text style={styles.sectionTitle}>Transportation method</Text>
        <Text>{actor.method}</Text>
        <Text style={styles.sectionTitle}>Distance {actor.feedorigin}</Text>
        <Text>{actor.distance}</Text>
        {actor.cert && <View style={{marginTop: 20 }} >
          <Text style={styles.sectionTitle}>Certificate</Text>
          <Pressable onPress={() => navigation.navigate('Certificate Info', {cert: actor.cert})}>
            <Image style={{width: 40, height: 40}}
              source={{
                uri: 'https://qr-code-server-2.loca.lt/certified.jpg',
              }}
            />  
          </Pressable>
        </View>
        }
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  function AbattoirInfo({route, navigation}){
    const {actor} = route.params;
    console.log(actor)
    return (
      <View style={{ flex: 1, marginHorizontal: 10}}>
        <Text style={styles.sectionTitle}>Company name</Text>
        <Text>{actor.name}</Text>
        <Text style={styles.sectionTitle}>Company address</Text>
        <Text>{actor.address}, {actor.city}</Text>
        <Text style={styles.sectionTitle}>Slaughter method</Text>
        <Text>{actor.method}</Text>
        {actor.cert && <View style={{marginTop: 20 }} >
          <Text style={styles.sectionTitle}>Certificate</Text>
          <Pressable onPress={() => navigation.navigate('Certificate Info', {cert: actor.cert})}>
            <Image style={{width: 40, height: 40}}
              source={{
                uri: 'https://qr-code-server-2.loca.lt/certified.jpg',
              }}
            />  
          </Pressable>
        </View>
        }
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  function ProcessingInfo({route, navigation}){
    const {actor} = route.params;
    console.log(actor)
    return (
      <View style={{ flex: 1, marginHorizontal: 10}}>
        <Text style={styles.sectionTitle}>Company name</Text>
        <Text>{actor.name}</Text>
        <Text style={styles.sectionTitle}>Company address</Text>
        <Text>{actor.address}, {actor.city}</Text>
        <Text style={styles.sectionTitle}>Packaging material</Text>
        <Text>{actor.packaging}</Text>
        {actor.cert && <View style={{marginTop: 20 }} >
          <Text style={styles.sectionTitle}>Certificate</Text>
          <Pressable onPress={() => navigation.navigate('Certificate Info', {cert: actor.cert})}>
            <Image style={{width: 40, height: 40}}
              source={{
                uri: 'https://qr-code-server-2.loca.lt/certified.jpg',
              }}
            />  
          </Pressable>
        </View>
        }
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  function RetailerInfo({route, navigation}){
    const {actor} = route.params;
    console.log(actor)
    return (
      <View style={{ flex: 1, marginHorizontal: 10}}>
        <Text style={styles.sectionTitle}>Company name</Text>
        <Text>{actor.name}</Text>
        <Text style={styles.sectionTitle}>Company address</Text>
        <Text>{actor.address}, {actor.city}</Text>
        <Text style={styles.sectionTitle}>Packaging material</Text>
        <Text>{actor.packaging}</Text>
        {actor.cert && <View style={{marginTop: 20 }} >
          <Text style={styles.sectionTitle}>Certificate</Text>
          <Pressable onPress={() => navigation.navigate('Certificate Info', {cert: actor.cert})}>
            <Image style={{width: 40, height: 40}}
              source={{
                uri: 'https://qr-code-server-2.loca.lt/certified.jpg',
              }}
            />  
          </Pressable>
        </View>
        }
        <Button title="Go back" onPress={() => navigation.goBack()} />
      </View>
    );
  }


  function CertificateInfo({route, navigation}){
    const {cert} = route.params;
    return (
      <View style={{flex: 1, marginHorizontal: 10}}>
        <Text style={styles.mainTitle}>Certificate Name</Text>
        <Image
        style={{width: 40, height: 40}}
        source={{
          uri: 'https://qr-code-server-2.loca.lt/certified.jpg',
        }}
      />
        <Text style={styles.sectionTitle}>Category</Text>
        <Text>{cert.product_category}</Text>
        <Text style={styles.sectionTitle}>Valid until</Text>
        <Text>{cert.Valid_until}</Text>
        <Text style={styles.sectionTitle}>Date of inspection</Text>
        <Text>{cert.Date_of_annual_inspection}</Text>
        <Text style={styles.sectionTitle}>Date of issuing</Text>
        <Text>{cert.Date_of_issuing}</Text>
        <Text style={styles.sectionTitle}>Place of issuing</Text>
        <Text>{cert.Place_of_issuing}</Text>
      </View>
    );
  }

  function Info({ navigation , route}) {

    const [js, setJS] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const {name} = route.params;

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

    const formatDate = (date) => {
      console.log(date)
      const dd = date.getDate();
      const mm = date.getMonth();
      const yyyy = date.getFullYear();
      const result = `${dd}.${mm}.${yyyy}`;
      return result;
    }

    const onEventPressed = (e) => {
      if(e.index === 0){
        onClickFarm(js[e.index]);
      }else if(e.index === 2){
        onClickAbattoir(js[e.index]);
      }else if(e.index === 4){
        onClickProcessing(js[e.index]);
      }else if(e.index === 6){
        onClickRetailer(js[e.index]);
      }else if(e.index === 1 || e.index === 3 || e.index === 5){
        onClickTransport(js[e.index]);
      }else{
        //should never happen, do nothing
      }
    }

    const getData = () => {
      return ([
      {time: formatDate(new Date(js[0].recordTime)), title: js[0].name, description: "Farm", index: 0},
      {time: formatDate(new Date(js[1].recordTime)), title: js[1].name, description: "Transportation", index: 1},
      {time: formatDate(new Date(js[2].recordTime)), title: js[2].name, description: "Abattoir", index: 2},
      {time: formatDate(new Date(js[3].recordTime)), title: js[3].name, description: "Transportation", index: 3},
      {time: formatDate(new Date(js[4].recordTime)), title: js[4].name, description: "Processing", index: 4},
      {time: formatDate(new Date(js[5].recordTime)), title: js[5].name, description: "Transportation", index: 5},
      {time: formatDate(new Date(js[6].recordTime)), title: js[6].name, description: "Retailer", index: 6}
    ])}


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
      <View style={{ flex: 1, marginHorizontal: 10}}>
        <Text style={styles.mainTitle}>{name}</Text>
        <Text style={styles.sectionTitle}>Origin</Text>
        <Text style={{marginBottom: 20}}>{js[0].city}</Text>
        <Text style={styles.sectionTitle}>Total distance travelled</Text>
        <Text style={{marginBottom: 10}}>{js[1].distance + js[3].distance + js[5].distance}km</Text>
        <Text style={styles.sectionTitle}>Supply Chain</Text>
        <Timeline data={getData()} style={{width: '100%'}} onEventPress={onEventPressed}/>
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
        <Stack.Screen
          name="Certificate Info"
          component={CertificateInfo}
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
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#b642f5',
  },
  mainTitle: {
    fontWeight: 'bold', 
    marginBottom: 15, 
    fontSize: 30
  },
  sectionTitle: {
    fontWeight: 'bold', 
    marginVertical: 10, 
    fontSize: 20
  }
});