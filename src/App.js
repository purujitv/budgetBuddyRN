import {
  StyleSheet,
  Alert,
  Platform,
  PermissionsAndroid,
  SafeAreaView,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import RootNavigator from './navigation/RootNavigator';
import messaging from '@react-native-firebase/messaging';
import {COLORS} from './constants';

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
    <SafeAreaView style={styles.container}>
      <RootNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
});
