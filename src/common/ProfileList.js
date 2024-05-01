import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {FONTS, IMAGES} from '../constants';
import {moderateScale} from '../utlis/Metrics';

export default function ProfileList({icon, onPress, title}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.main}
        activeOpacity={0.9}
        onPress={onPress}>
        <View style={styles.title}>
          <Image source={icon} />
          <Text style={styles.titleText}>{title}</Text>
        </View>
        <Image source={IMAGES.NAVIGATE} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop:20
  },
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {flexDirection: 'row', alignItems: 'center', columnGap: 20},
  titleText: {
    fontSize: moderateScale(18),
    fontFamily: FONTS.w500,
    color: 'rgba(81,75,75,1.0)',
  },
});
