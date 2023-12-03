import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Image, Pressable, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Messages } from './screens/Messages';
import { Account } from './screens/Account';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInbox, faQrcode, faUser } from '@fortawesome/free-solid-svg-icons';
import { Home } from './screens/Home';
import { FetchInfo } from './screens/FetchInfo';
import { MessageChain } from './screens/MessageChain';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContextProvider, useUser } from './Contexts';

const rootStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

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
          component={FetchInfo}
          options={{
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
          }}
        />
    </Stack.Navigator>
  )
}

function MessageStack() {
  return(
    <Stack.Navigator>
      <Stack.Screen
          name="Messages"
          component={Messages}
          options={{
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
          }}
        />
        <Stack.Screen
          name="MessageChain"
          component={MessageChain}
          options={{
            headerTintColor: 'black',
            headerStyle: { backgroundColor: 'white' },
            title: 'Messages'
          }}
        />
    </Stack.Navigator>
  )
}

function BottomTabs() {
  return (
    <Tab.Navigator
    screenOptions={
      ({route}) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'ScanFlow') {
            iconName = faQrcode;
            size = focused ? 25: 20;
          } else if (route.name === 'MessageStack') {
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
        name={'ScanFlow'} 
        component={ScanFlow} 
        options = {{
          headerShown: false,
        }}
      />
      {useUser ?? <Tab.Screen 
        name={'MessageStack'} 
        component={MessageStack} 
        options={{
          headerShown: false,
        }}
      />}
      <Tab.Screen 
        name={'Account'} 
        component={Account} 
        options={{
          headerTintColor: 'black',
          headerStyle: { backgroundColor: 'white' },
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);

  function Splash({ navigation }) {

    useEffect(() => {
      setTimeout(() => {
          navigation.replace('BottomTabs', { screen: 'Home'});
      }, 2000);
    }, []);
    
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Home screen</Text>
        </View>
    );
  }

  // Return the View
  return (
    <AuthContextProvider >
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
    </AuthContextProvider>
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