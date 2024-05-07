import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONTS, IMAGES} from '../constants';
import {moderateScale} from '../utlis/Metrics';
import {useNavigation} from '@react-navigation/native';

export default function AppHeader({title}) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.main}
        activeOpacity={0.9}
        onPress={() => navigation.goBack()}>
        <View style={styles.section}>
          <Image source={IMAGES.BACKNAVIGATION} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {backgroundColor: COLORS.PRIMARY, height: 60},
  main: {paddingHorizontal: 20, paddingVertical: 15},
  title: {
    color: COLORS.WHITE,
    fontFamily: FONTS.w700,
    fontSize: moderateScale(17),
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 20,
  },
});
