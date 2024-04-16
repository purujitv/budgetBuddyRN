import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants';
import {horizontalScale, moderateScale, verticalScale} from '../utlis/Metrics';

export default function HomeScreenCard({image, title, amount}) {
  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.amount}>{amount}</Text>
        </View>
        <View>
          <Image source={image} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.HOMEWHITE,
    height: verticalScale(65),
    width: horizontalScale(164),
    borderRadius: 10,
    marginTop: 22,
    shadowColor: 'rgba(0, 0, 0, 0.25)',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingHorizontal: 8,
  },
  title: {
    color: COLORS.HOMECARD,
    fontFamily: FONTS.w700,
    fontSize: moderateScale(14),
  },
  amount: {
    color: COLORS.BLACK,
    fontFamily: FONTS.w700,
    fontSize: moderateScale(16),
  },
});
