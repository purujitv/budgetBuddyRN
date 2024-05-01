import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import {moderateScale} from '../../../utlis/Metrics';
import ProfileList from '../../../common/ProfileList';
import {Divider} from '@rneui/themed';
import AppButton from '../../../common/AppButton';
import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default function Profile() {
  const navigation = useNavigation();

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('User Signed Out'), navigation.navigate('Login'));
  };
  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.HEROBG}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <View style={styles.redBox}>
        <View style={{bottom: 80}}>
          <TouchableOpacity style={{alignItems: 'center'}} activeOpacity={0.9}>
            <View
              style={{
                backgroundColor: COLORS.WHITE,
                height: 142,
                width: 142,
                borderRadius: 142 / 2,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  alignSelf: 'center',
                }}>
                <Image
                  source={IMAGES.DP}
                  style={{height: 132, width: 132, borderRadius: 132 / 2}}
                />
              </View>
            </View>
            <View style={{position: 'absolute', top: 110, right: 150}}>
              <Image source={IMAGES.EDIT} />
            </View>
          </TouchableOpacity>

          <View>
            <View style={{padding: 10, alignItems: 'center'}}>
              <Text
                style={{fontSize: moderateScale(24), fontFamily: FONTS.w800}}>
                Guest 56235
              </Text>
              <Text
                style={{fontSize: moderateScale(16), fontFamily: FONTS.w700}}>
                guestlogin
              </Text>
            </View>
            <View>
              <Image source={IMAGES.DIVIDER} />
            </View>
            <View style={{padding: 20}}>
              <Text
                style={{fontFamily: FONTS.w700, fontSize: moderateScale(18)}}>
                GENERAL
              </Text>
              <ProfileList icon={IMAGES.PERSON} title={'Profile Settings'} />
              <Divider style={{padding: 5}} />
              <ProfileList icon={IMAGES.PASSWORD} title={'Change Password'} />
              <Divider style={{padding: 5}} />
              <ProfileList
                icon={IMAGES.HISTORY}
                title={'Transaction History'}
              />
              <Divider style={{padding: 5}} />
              <ProfileList icon={IMAGES.LOCK} title={'Privacy Policy'} />
              <Divider style={{padding: 5}} />
              <ProfileList icon={IMAGES.RECEIPT} title={'Terms of Service'} />
              <Divider style={{padding: 5}} />
              <ProfileList icon={IMAGES.HELP} title={'Help'} />
            </View>
            <View style={{padding: 10, justifyContent: 'center', left: 40}}>
              <AppButton
                title={'Log Out'}
                backgroundColor={COLORS.PRIMARY}
                color={COLORS.WHITE}
                width={'80%'}
                onPress={handleLogout}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '20%',
  },
  redBox: {
    marginTop: 100,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 25,
  },
});
