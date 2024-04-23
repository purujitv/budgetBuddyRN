import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from './AuthNavigator';
import DashboardNavigator from './DashboardNavigator';
import DashboardStackNavigator from './DashBoardStackNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Auth" component={AuthNavigator}/>
        <Stack.Screen name="Dashboard" component={DashboardNavigator} />
        <Stack.Screen name="DashboardStack" component={DashboardStackNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
