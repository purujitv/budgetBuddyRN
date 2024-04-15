import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS} from '../constants';

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
          height: height ? height : 44,
          width: width ? width : 155,
          backgroundColor: backgroundColor,
          borderWidth: borderWidth,
        }}
        onPress={onPress}>
        <Text
          style={{
            ...styles.btnText,
            fontSize: fontSize ? fontSize : 17,
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
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.WHITE,
  },
  btnText: {
    fontFamily: FONTS.w500,
  },
});
