import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Income from '../screens/dashboard/Income';
import Expense from '../screens/dashboard/Expense';
import Notification from '../screens/dashboard/Notifications';
import ChangePassword from '../screens/dashboard/ChangePassword';
const Stack = createNativeStackNavigator();
export default function DashboardStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Income">
      {/* <Stack.Screen name="Income" component={Income} />
      <Stack.Screen name="Expense" component={Expense} />
      <Stack.Screen name="Notification" component={Notification} /> */}
      <Stack.Screen name='ChangePassword' component={ChangePassword}/>
    </Stack.Navigator>
  );
}
