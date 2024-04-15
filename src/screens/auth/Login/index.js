import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import styles from '../styles';
import {useNavigation} from '@react-navigation/native';
import AppTextInput from '../../../common/AppTextInput';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import AppButton from '../../../common/AppButton';
import {moderateScale, verticalScale} from '../../../utlis/Metrics';

export default function Login() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={IMAGES.BACKGROUND}
        style={{...StyleSheet.absoluteFillObject}}
      />
      <View style={styles.overlay}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.82)',
            padding: 20,
            borderRadius: 20,
          }}>
          <Image source={IMAGES.LOGO} style={{alignSelf: 'center'}} />
          <View style={{paddingTop: 18, alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 21,
                fontFamily: FONTS.w800,
                color: COLORS.WHITE,
              }}>
              BUDGET BUDDY
            </Text>
            <Text
              style={{
                fontSize: 10,
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
              <AppTextInput
                placeholder={'Enter username'}
                placeholderTextColor={COLORS.PLACEHOLDER}
              />
            </View>
            <View style={{paddingTop: 10}}>
              <AppTextInput
                placeholder={'Password'}
                placeholderTextColor={COLORS.PLACEHOLDER}
                secureTextEntry={true}
              />
              
            </View>
          </View>
          <View
            style={{
              paddingTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <AppButton
              title={'Start As Guest'}
              borderWidth={1}
              color={COLORS.OFFWHITE}
              onPress={() => navigation.navigate('GuestLogin')}
            />
            <AppButton
              title={'Login'}
              backgroundColor={COLORS.PRIMARY}
              color={COLORS.WHITE}
              onPress={() => navigation.navigate('Dashboard', {Screen: 'Home'})}
            />
          </View>
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
              columnGap: 10,
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
              columnGap: 10,
              paddingTop: moderateScale(10),
            }}>
            <TouchableOpacity onPress={() => console.log('first')}>
              <Image source={IMAGES.GOOGLE} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('second')}>
              <Image source={IMAGES.APPLE} />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'center', paddingTop: 20}}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => console.log('SignUp')}>
              <Text
                style={{
                  color: COLORS.WHITE,
                  fontFamily: FONTS.w500,
                  fontSize: moderateScale(15),
                }}>
                Don’t have an account?
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
