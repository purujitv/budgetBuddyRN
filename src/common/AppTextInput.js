import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS} from '../constants';
import {moderateScale} from '../utlis/Metrics';
import {IMAGES} from '../constants'; // Assuming you have an IMAGES constant for your eye icons

export default function AppTextInput({
  placeholder,
  secureTextEntry,
  value,
  onChangeText,
  placeholderTextColor,
  onBlur,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        style={styles.textInput}
        secureTextEntry={!showPassword ? secureTextEntry : false}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
      {secureTextEntry && (
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={togglePasswordVisibility}>
          <Image
            source={showPassword ? IMAGES.HIDE : IMAGES.VIEW}
            style={styles.toggleIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: moderateScale(1),
    borderColor: COLORS.WHITE,
  },
  textInput: {
    flex: 1,
    fontSize: moderateScale(15),
    fontFamily: FONTS.w600,
    color: COLORS.WHITE,
    paddingVertical: moderateScale(10),
  },
  toggleButton: {
    padding: moderateScale(10),
  },
  toggleIcon: {
    width: moderateScale(20),
    height: moderateScale(20),
    tintColor: COLORS.WHITE,
  },
});
