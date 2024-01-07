import 'react-native-gesture-handler';
import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button, Image, Pressable, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Messages } from './screens/Messages';
import { Account } from './screens/Account';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInbox, faQrcode, faUser } from '@fortawesome/free-solid-svg-icons';
import { Home } from './screens/Home';
import { FetchInfo } from './components/FetchInfo';
import { MessageChain } from './screens/MessageChain';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CreateAccount } from './screens/CreateAccount';
import { AuthContext, AuthProvider } from './Contexts';
import { ProductInfo } from './screens/ProductInfo';
import { Provider } from 'react-redux';
import { Store } from './redux/store';

const rootStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();
const MsgStack = createStackNavigator();

function ScanFlow() {
  return(
    <Stack.Navigator>
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
          component={ProductInfo}
          options={{
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
          }}
        />
    </Stack.Navigator>
  )
}

function AccountStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen
          name={'AccountStart'} 
          component={Account} 
          options={{
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
            title: 'Account'
          }}
        />
        <Stack.Screen
          name={'Create'} 
          component={CreateAccount} 
          options={{
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
            title: 'Create account'
          }}
        />
    </Stack.Navigator>
  )
}

function MessageStack() {
  return(
    <MsgStack.Navigator>
      <MsgStack.Screen
          name="Messages"
          component={Messages}
          options={{
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
            title: 'Messages'
          }}
        />
        <MsgStack.Screen
          name="MessageChain"
          component={MessageChain}
          options={{
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
          }}
        />
    </MsgStack.Navigator>
  )
}


export default function App() {

  function Splash({ navigation }) {

    useEffect(() => {
      setTimeout(() => {
          navigation.replace('BottomTabs', { screen: 'Home'});
      }, 2000);
    }, []);
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
          <Image style={{width: 250, height: 300}} source={require('./images/logo.png')} />
        </View>
    );
  }

  function BottomTabs() {
    const { auth } = useContext(AuthContext);
    return (
      <Tab.Navigator
      screenOptions={
        ({route}) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Scan') {
              iconName = faQrcode;
              size = focused ? 25: 20;
            } else if (route.name === 'Inbox') {
              iconName = faInbox;
              size = focused ? 25: 20;
            } else {
              iconName = faUser;
              size = focused ? 25: 20;
            }
            return(
              <FontAwesomeIcon icon={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: '#0080ff',
          tabBarInactiveTintColor: '#777777',
        })
      }
      >
        <Tab.Screen
          name={'Scan'} 
          component={ScanFlow} 
          options = {{
            headerShown: false
          }}
        />
        {auth && <Tab.Screen 
          name={'Inbox'} 
          component={MessageStack} 
          options={{
            headerShown: false
          }}
        />}
        <Tab.Screen 
          name={'Account'} 
          component={AccountStack} 
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    )
  }
  

  // Return the View
  return (
    <Provider store={Store}>
      <AuthProvider >
        <SafeAreaView style={{ flex: 1}}>
          <NavigationContainer>
            <rootStack.Navigator 
              initialRouteName='App Name'
            >
              <rootStack.Screen 
                name="BottomTabs"
                component={BottomTabs}
                options = {{
                  headerShown: false,
                }}
              />
              <rootStack.Screen
                name="App Name"
                component={Splash}
                options = {{
                  headerShown: false,
                }}
              />
            </rootStack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </AuthProvider>
    </Provider>
  );
}

export const styles = StyleSheet.create({
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