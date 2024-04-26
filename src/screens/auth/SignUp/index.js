import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styles from '../styles';
import {useNavigation} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {moderateScale, verticalScale} from '../../../utlis/Metrics';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import {CLIENTID} from '../../../config/googleSignIn';
import AppTextInput from '../../../common/AppTextInput';
import AppButton from '../../../common/AppButton';
const {width, height} = Dimensions.get('window');

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  username: Yup.string().required('Username is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one digit, and one special character.',
    ),
});

const SignUp = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState('');

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

  return (
    <Formik
      initialValues={{firstName: '', lastName: '', username: '', password: ''}}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values); // Handle form submission here
        navigation.navigate('Dashboard', {Screen: 'Home'});
      }}>
      {formikProps => (
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
                padding: moderateScale(15),
                borderRadius: moderateScale(20),
              }}>
              <Image source={IMAGES.LOGO} style={{alignSelf: 'center'}} />
              <View
                style={{paddingTop: moderateScale(18), alignItems: 'center'}}>
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
              <View style={{paddingTop: verticalScale(20)}}>
                <Text
                  style={{
                    color: COLORS.TEXTPRIMARY,
                    fontSize: moderateScale(30),
                    fontFamily: FONTS.w800,
                  }}>
                  Sign Up
                </Text>
                <Text
                  style={{
                    color: COLORS.WHITE,
                    fontSize: moderateScale(15),
                    fontFamily: FONTS.w500,
                  }}>
                  Create your account
                </Text>
                <View style={{paddingTop: 15}}>
                  <AppTextInput
                    placeholder={'First Name'}
                    placeholderTextColor={COLORS.PLACEHOLDER}
                    onChangeText={formikProps.handleChange('firstName')}
                    onBlur={formikProps.handleBlur('firstName')}
                    value={formikProps.values.firstName}
                  />
                  {formikProps.errors.firstName &&
                    formikProps.touched.firstName && (
                      <Text style={{color: 'red', paddingTop: 5}}>
                        {formikProps.errors.firstName}
                      </Text>
                    )}
                </View>
                <View style={{paddingTop: 10}}>
                  <AppTextInput
                    placeholder={'Last Name'}
                    placeholderTextColor={COLORS.PLACEHOLDER}
                    onChangeText={formikProps.handleChange('lastName')}
                    onBlur={formikProps.handleBlur('lastName')}
                    value={formikProps.values.lastName}
                  />
                  {formikProps.errors.lastName &&
                    formikProps.touched.lastName && (
                      <Text style={{color: 'red', paddingTop: 5}}>
                        {formikProps.errors.lastName}
                      </Text>
                    )}
                </View>
                <View style={{paddingTop: 10}}>
                  <AppTextInput
                    placeholder={'Enter username'}
                    placeholderTextColor={COLORS.PLACEHOLDER}
                    onChangeText={formikProps.handleChange('username')}
                    onBlur={formikProps.handleBlur('username')}
                    value={formikProps.values.username}
                  />
                  {formikProps.errors.username &&
                    formikProps.touched.username && (
                      <Text style={{color: 'red', paddingTop: 5}}>
                        {formikProps.errors.username}
                      </Text>
                    )}
                </View>
                <View style={{paddingTop: 10}}>
                  <AppTextInput
                    placeholder={'Password'}
                    placeholderTextColor={COLORS.PLACEHOLDER}
                    secureTextEntry={true}
                    onChangeText={formikProps.handleChange('password')}
                    onBlur={formikProps.handleBlur('password')}
                    value={formikProps.values.password}
                  />
                  {formikProps.errors.password &&
                    formikProps.touched.password && (
                      <Text style={{color: 'red', paddingTop: 5}}>
                        {formikProps.errors.password}
                      </Text>
                    )}
                </View>
              </View>
              <View
                style={{
                  paddingTop: moderateScale(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                  columnGap: moderateScale(20),
                }}>
                <AppButton
                  title={'Sign Up'}
                  backgroundColor={COLORS.PRIMARY}
                  color={COLORS.WHITE}
                  width={300}
                  onPress={formikProps.handleSubmit}
                />
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
                  onPress={() => navigation.goBack()}>
                  <Text
                    style={{
                      color: COLORS.WHITE,
                      fontFamily: FONTS.w500,
                      fontSize: moderateScale(15),
                    }}>
                    Already have an account?
                    <Text
                      style={{
                        textDecorationLine: 'underline',
                        color: COLORS.TEXTPRIMARY,
                      }}>
                      Login
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;
