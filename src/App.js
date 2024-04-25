import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect} from 'react';
import RootNavigator from './navigation/RootNavigator';
import messaging from '@react-native-firebase/messaging';

export default function App() {
  const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {}
    }
  };

  useEffect(() => {
    checkApplicationPermission();
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    let token = await messaging().getToken();
    console.log('token ====>', token);
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return (
    <View style={styles.container}>
      <RootNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
