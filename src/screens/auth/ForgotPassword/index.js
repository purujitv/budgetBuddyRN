import {View, Text, Image, StyleSheet, Dimensions, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from '../styles';
import {useNavigation} from '@react-navigation/native';
import AppTextInput from '../../../common/AppTextInput';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import AppButton from '../../../common/AppButton';
import {moderateScale, verticalScale} from '../../../utlis/Metrics';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';

import {firebase} from '@react-native-firebase/auth';

const {width, height} = Dimensions.get('window');

export default function Login() {
  const navigation = useNavigation();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .matches(
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        'Invalid email address',
      ),
  });

  const handleForgotPassword = async email => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(
        Alert.alert(
          'Please check your email address the reset link has been send',
        ),
      )
      .catch(err => console.log(err));
  };

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
            initialValues={{email: ''}}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              actions.resetForm(), actions.setSubmitting(false);
              handleForgotPassword(values.email);
              navigation.navigate('Login');
            }}>
            {formikProps => (
              <View style={{paddingTop: verticalScale(10)}}>
                <Text
                  style={{
                    color: COLORS.TEXTPRIMARY,
                    fontSize: moderateScale(25),
                    fontFamily: FONTS.w800,
                  }}>
                  Forgot Password
                </Text>
                <Text
                  style={{
                    color: COLORS.WHITE,
                    fontSize: moderateScale(15),
                    fontFamily: FONTS.w500,
                  }}>
                  Please enter register email to your account
                </Text>
                <View style={{paddingTop: 5}}>
                  <Field name="email">
                    {({field, form}) => (
                      <AppTextInput
                        placeholder={'Enter email'}
                        placeholderTextColor={COLORS.PLACEHOLDER}
                        onChangeText={field.onChange('email')}
                        onBlur={field.onBlur('email')}
                        value={field.value}
                      />
                    )}
                  </Field>
                  {formikProps.errors.email && formikProps.touched.email && (
                    <Text style={{color: 'red', paddingTop: 5}}>
                      {formikProps.errors.email}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    paddingTop: verticalScale(20),
                    paddingBottom: verticalScale(10),
                    alignItems: 'center',
                  }}>
                  <AppButton
                    title={'Forgot Password'}
                    backgroundColor={COLORS.PRIMARY}
                    color={COLORS.WHITE}
                    width={316}
                    onPress={formikProps.handleSubmit}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
}
