import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import styles from '../styles';
import {useNavigation} from '@react-navigation/native';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import AppButton from '../../../common/AppButton';
import {moderateScale, verticalScale} from '../../../utlis/Metrics';

export default function Login() {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={IMAGES.BACKGROUND}
        style={{ ...StyleSheet.absoluteFillObject }}
      />
      <View
       style={styles.overlay}>
        <View
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.82)',
            padding: 20,
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
            }}>
            <AppButton
              title={'Continue'}
              width={316}
              backgroundColor={COLORS.PRIMARY}
              color={COLORS.WHITE}
              onPress={() => navigation.navigate("Dashboard", {Screen:'Home'})}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
