import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Income from '../screens/dashboard/Income';
import Expense from '../screens/dashboard/Expense';
const Stack = createNativeStackNavigator();
export default function DashboardStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Income" component={Income} />
      <Stack.Screen name="Expense" component={Expense} />
    </Stack.Navigator>
  );
}
