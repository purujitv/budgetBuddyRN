import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import RootNavigator from './navigation/RootNavigator'
import { COLORS } from './constants'

export default function App() {
  return (
    <View style={styles.container}>
     <RootNavigator/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1, 
  }
})