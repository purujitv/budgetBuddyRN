import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import GuestLogin from '../screens/auth/GuestLogin';
import SingUp from '../screens/auth/SignUp';
const Stack = createNativeStackNavigator();
export default function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="GuestLogin" component={GuestLogin} />
      <Stack.Screen name="SignUp" component={SingUp} />
    </Stack.Navigator>
  );
}
