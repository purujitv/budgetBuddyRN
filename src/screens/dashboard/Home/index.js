import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {FONTS, IMAGES} from '../../../constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utlis/Metrics';

export default function Home() {
  return (
    <View style={{paddingTop: 20, marginHorizontal: horizontalScale(10)}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            columnGap: 10,
            alignSelf: 'center',
          }}>
          <View>
            <Image source={IMAGES.DP} />
          </View>
          <View>
            <Text style={{fontFamily: FONTS.w600, fontSize: moderateScale(14)}}>
              Good Morning
            </Text>
            <Text style={{fontFamily: FONTS.w700, fontSize: moderateScale(18)}}>
              Guest 56235
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{justifyContent: 'flex-end', alignSelf: 'center'}}
          onPress={() => console.log('first')}>
          <Image source={IMAGES.BELL} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
