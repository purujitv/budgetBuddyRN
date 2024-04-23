import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../styles';
import {useNavigation} from '@react-navigation/native';
import AppTextInput from '../../../common/AppTextInput';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import AppButton from '../../../common/AppButton';
import {moderateScale, verticalScale} from '../../../utlis/Metrics';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'; // Added import
import {CLIENTID} from '../../../config/googleSignIn';

const {width, height} = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState('');

  const saveData = async values => {
    try {
      await firestore().collection('Users').add({
        email: values.username,
        password: values.password,
      });
      console.log('User added!');
    } catch (error) {
      console.error('Error adding user: ', error);
      // Handle error
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: CLIENTID.GOOGLECLIENTID,
    });
  }, []);

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const usrInfo = await GoogleSignin.signIn();
      console.log('User Info:', usrInfo);
      setUserInfo(usrInfo);

      const {idToken} = usrInfo;
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);

      navigation.navigate('Dashboard', {Screen: 'Home'});
    } catch (error) {
      Alert.alert(
        'Google Login Error',
        'An error occurred during Google login. Please try again.',
      );
    }
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={IMAGES.BACKGROUND}
        resizeMode="cover"
        style={{...StyleSheet.absoluteFillObject, width: width, height: height}}
      />
      <View style={styles.overlay}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.82)',
            padding: moderateScale(14),
            borderRadius: moderateScale(20),
          }}>
          <Image source={IMAGES.LOGO} style={{alignSelf: 'center'}} />
          <View style={{paddingTop: moderateScale(18), alignItems: 'center'}}>
            <Text
              style={{
                fontSize: moderateScale(21),
                fontFamily: FONTS.w800,
                color: COLORS.WHITE,
              }}>
              BUDGET BUDDY
            </Text>
            <Text
              style={{
                fontSize: moderateScale(12),
                fontFamily: FONTS.w500,
                color: COLORS.WHITE,
              }}>
              FINANCIAL FREEDOM STARTS HERE
            </Text>
          </View>

          <Formik
            initialValues={{username: '', password: ''}}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              actions.resetForm(), actions.setSubmitting(false);
              saveData(values); // Save data to Firestore
              navigation.navigate('Dashboard', {Screen: 'Home'});
            }}>
            {formikProps => (
              <View style={{paddingTop: verticalScale(20)}}>
                <Text
                  style={{
                    color: COLORS.TEXTPRIMARY,
                    fontSize: moderateScale(30),
                    fontFamily: FONTS.w800,
                  }}>
                  Login
                </Text>
                <Text
                  style={{
                    color: COLORS.WHITE,
                    fontSize: moderateScale(15),
                    fontFamily: FONTS.w500,
                  }}>
                  Please login to your account
                </Text>
                <View style={{paddingTop: 15}}>
                  <Field name="username">
                    {({field, form}) => (
                      <AppTextInput
                        placeholder={'Enter username'}
                        placeholderTextColor={COLORS.PLACEHOLDER}
                        onChangeText={field.onChange('username')}
                        onBlur={field.onBlur('username')}
                        value={field.value}
                      />
                    )}
                  </Field>
                  {formikProps.errors.username &&
                    formikProps.touched.username && (
                      <Text style={{color: 'red', paddingTop: 5}}>
                        {formikProps.errors.username}
                      </Text>
                    )}
                </View>
                <View style={{paddingTop: 10}}>
                  <Field name="password">
                    {({field, form}) => (
                      <AppTextInput
                        placeholder={'Password'}
                        placeholderTextColor={COLORS.PLACEHOLDER}
                        secureTextEntry={true}
                        onChangeText={field.onChange('password')}
                        onBlur={field.onBlur('password')}
                        value={field.value}
                      />
                    )}
                  </Field>
                  {formikProps.errors.password &&
                    formikProps.touched.password && (
                      <Text style={{color: 'red', paddingTop: 5}}>
                        {formikProps.errors.password}
                      </Text>
                    )}
                </View>
                <View
                  style={{
                    paddingTop: moderateScale(20),
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    columnGap: moderateScale(20),
                  }}>
                  <AppButton
                    title={'Start As Guest'}
                    borderWidth={2}
                    color={COLORS.OFFWHITE}
                    onPress={() => navigation.navigate('GuestLogin')}
                  />
                  <AppButton
                    title={'Login'}
                    backgroundColor={COLORS.PRIMARY}
                    color={COLORS.WHITE}
                    onPress={formikProps.handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>

          <View>
            <TouchableOpacity
              onPress={() => console.log('Forgot Password?')}
              activeOpacity={0.9}>
              <Text
                style={{
                  textAlign: 'center',
                  textDecorationLine: 'underline',
                  color: COLORS.TEXTPRIMARY,
                  fontFamily: FONTS.w500,
                  fontSize: moderateScale(15),
                  paddingTop: verticalScale(20),
                }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              alignContent: 'center',
              paddingTop: moderateScale(15),
              flexDirection: 'row',
              columnGap: moderateScale(10),
            }}>
            <Image source={IMAGES.LINELEFT} />

            <Text
              style={{
                color: COLORS.WHITE,
                fontFamily: FONTS.w700,
                fontSize: moderateScale(15),
              }}>
              Social Login
            </Text>
            <Image source={IMAGES.LINERIGHT} />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              columnGap: moderateScale(10),
              paddingTop: moderateScale(10),
            }}>
            <TouchableOpacity onPress={onGoogleButtonPress}>
              <Image source={IMAGES.GOOGLE} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('second')}>
              <Image source={IMAGES.APPLE} />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', paddingTop: 20}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => navigation.navigate('SignUp')}>
              <Text
                style={{
                  color: COLORS.WHITE,
                  fontFamily: FONTS.w500,
                  fontSize: moderateScale(15),
                }}>
                Don't have an account?
                <Text
                  style={{
                    textDecorationLine: 'underline',
                    color: COLORS.TEXTPRIMARY,
                  }}>
                  Sign Up
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
