import {View, Text, Image, Alert} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import AppTextInput from '../../../common/AppTextInput';
import AppButton from '../../../common/AppButton';
import {moderateScale} from '../../../utlis/Metrics';
import auth from '@react-native-firebase/auth';
import AppHeader from '../../../common/AppHeader';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleChangePassword = () => {
    const user = auth().currentUser;

    if (!user) {
      console.log('No user signed in.');
      return;
    }

    const credential = auth.EmailAuthProvider.credential(
      user.email,
      currentPassword,
    );

    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        return user.updatePassword(newPassword);
      })
      .then(() => {
        Dialog.show({
          type: ALERT_TYPE.SUCCESS, 
          title:'Password Changed', 
          textBody:'Congrats! Password has been changed sucessfuly', 
          button:'close'
        })
      })
      .catch(error => {
        console.error('Error updating password:', error);
      });
  };

  return (
    <View>
        <AppHeader title={"Change Password"}/>
      <View
        style={{
          paddingHorizontal: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{paddingTop: 30, rowGap: 20, alignItems: 'center'}}>
          <Image source={IMAGES.CHANGEPASSWORD} />
          <Text
            style={{
              fontFamily: FONTS.w700,
              fontSize: moderateScale(18),
              textAlign: 'center',
            }}>
            Your new Password Must Be Different from Previously Used Password.
          </Text>
        </View>
        <View style={{paddingTop: 30, width: '100%', rowGap: 10}}>
          <AppTextInput
            borderColor={'rgba(196,196,191,1.0)'}
            placeholder={'Enter current password'}
            placeholderTextColor={'rgba(60,58,58,1.0)'}
            color={'black'}
            value={currentPassword}
            onChangeText={e => setCurrentPassword(e)}
          />
          <AppTextInput
            borderColor={'rgba(196,196,191,1.0)'}
            placeholder={'Enter new password'}
            placeholderTextColor={'rgba(60,58,58,1.0)'}
            color={'black'}
            value={newPassword}
            onChangeText={e => setNewPassword(e)}
            secureTextEntry={true}
          />
        </View>
        <View style={{paddingTop: 50}}>
          <AppButton
            title={'Change Password'}
            color={COLORS.WHITE}
            backgroundColor={COLORS.PRIMARY}
            width={316}
            onPress={handleChangePassword}
          />
        </View>
      </View>
    </View>
  );
}
