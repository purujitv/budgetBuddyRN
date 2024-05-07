import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import styles from '../styles';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import AppButton from '../../../common/AppButton';
import {moderateScale, verticalScale} from '../../../utlis/Metrics';
import {firebase} from '@react-native-firebase/auth';
const {width, height} = Dimensions.get('window');

export default function GuestLogin() {
  const navigation = useNavigation();
  const [userUid, setUserUid] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const handleAnonymousSignIn = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(result => {
        setUserUid(result.user.uid);
        console.log('User UID ======>', result.user.uid);
        result.user.getIdToken().then(token => {
          setIdToken(token);
          console.log('ID token:', token);
        });
        console.log('User signed in anonymously');
        navigation.navigate('Dashboard', {Screen: 'Home'});
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={IMAGES.BACKGROUND}
        resizeMode="cover"
        style={{
          ...StyleSheet.absoluteFillObject,
          width: width,
          height: height,
        }}
      />
      <View style={styles.overlay}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.82)',
            padding: 14,
            borderRadius: 20,
            rowGap: 20,
          }}>
          <Image source={IMAGES.LOGO} style={{alignSelf: 'center'}} />
          <View style={{alignItems: 'center', rowGap: 10}}>
            <Text
              style={{
                fontSize: moderateScale(21),
                fontFamily: FONTS.w800,
                color: COLORS.WHITE,
              }}>
              Starting As Guest
            </Text>
            <Text
              style={{
                fontSize: moderateScale(15),
                textAlign: 'center',
                fontFamily: FONTS.w600,
                color: COLORS.WHITE,
              }}>
              During guest mode app will save your data on your device. App
              itself will not be responsible for any data loss.
            </Text>
          </View>
          <View
            style={{
              paddingTop: verticalScale(15),
              paddingBottom: verticalScale(10),
              alignItems: 'center',
            }}>
            <AppButton
              title={'Continue'}
              backgroundColor={COLORS.PRIMARY}
              color={COLORS.WHITE}
              width={316}
              onPress={handleAnonymousSignIn}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
