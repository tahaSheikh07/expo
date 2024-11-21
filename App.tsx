import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Chat from './components/chat';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Status from './components/status';
import Camera from './components/camera';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    changeAuth();
  }, []);
  const changeAuth = () => {
    setTimeout(() => {
      setAuth(true);
    }, 5000);
  };

  return (
    <NavigationContainer>
      {!auth ? (<Stack.Navigator
        initialRouteName="signup"
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        <Stack.Screen
          name="signin"
          component={Signin}
        // options={{ cardStyleInterpolator: forFade }}
        />
        <Stack.Screen name="signup" component={Signup} />
      </Stack.Navigator>) : (
          <Tab.Navigator
            screenOptions={() => ({
              // headerShown: false,
            })}
          >
            <Tab.Screen name="home" component={Home} />
            <Tab.Screen name="chat" component={Chat} />
            <Tab.Screen name="status" component={Status} />
            <Tab.Screen name="camera" component={Camera} />
          </Tab.Navigator>
          
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});











// "use strict";
// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Home from './components/home';
// import Signin from './components/signin';
// import Signup from './components/signup';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Chat from './components/chat';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();
// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="home" component={Home} />
//       <Drawer.Screen name="chat" component={Chat} />
//     </Drawer.Navigator>
//   );
// }

// function TabNavigator() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="home" component={Home} />
//       <Tab.Screen name="chat" component={Chat} />
//     </Tab.Navigator>
//   );
// }

// export default function App() {
//   const [auth, setAuth] = useState(false);

//   const changeAuth = () => {
//     setTimeout(() => {
//       setAuth(true);
//     }, 5000);
//   };

//   useEffect(() => {
//     changeAuth();
//   }, []);

//   return (
//     <NavigationContainer>
//       {!auth ? (
//         <Stack.Navigator
//           initialRouteName="signup"
//           screenOptions={{
//             headerShown: false,
//           }}
//         >
//           <Stack.Screen name="signin" component={Signin} />
//           <Stack.Screen name="signup" component={Signup} />
//         </Stack.Navigator>
//       ) : (
//         // Use Drawer Navigator when authenticated, with the TabNavigator inside the Drawer
//         <MyDrawer />
//       )}
//     </NavigationContainer>
//   );
// }




















// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer, useNavigation } from '@react-navigation/native';
// import { Button } from '@react-navigation/elements';
// import { createDrawerNavigator } from '@react-navigation/drawer';

// const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator>
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Profile" component={ProfileScreen} />
//     </Drawer.Navigator>
//   );
// }

// function HomeScreen() {
//   const navigation = useNavigation();

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button onPress={() => navigation.navigate('Profile')}>
//         Go to Profile
//       </Button>
//     </View>
//   );
// }

// function ProfileScreen() {
//   const navigation = useNavigation();

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Profile Screen</Text>
//       <Button onPress={() => navigation.navigate('Home')}>Go to Home</Button>
//     </View>
//   );
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyDrawer />
//     </NavigationContainer>
//   );
// }
