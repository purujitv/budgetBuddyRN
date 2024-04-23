import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants';
import { horizontalScale, moderateScale, verticalScale } from '../utlis/Metrics';

export default function AppButton({
  fontSize,
  onPress,
  title,
  height,
  width,
  backgroundColor,
  borderWidth,
  color,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          ...styles.button,
          height: height ? height : verticalScale(44),
          width: width ? width : horizontalScale(155),
          backgroundColor: backgroundColor,
          borderWidth: borderWidth,
        }}
        onPress={onPress}>
        <Text
          style={{
            ...styles.btnText,
            lineHeight:moderateScale(20),
            fontSize: fontSize ? fontSize : moderateScale(17),
            color: color,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: moderateScale(10),
    borderRadius: moderateScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.WHITE,
  },
  btnText: {
    fontFamily: FONTS.w500,
  },
});
