import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, IMAGES} from '../../../constants';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utlis/Metrics';
import HomeScreenCard from '../../../common/HomeScreenCard';

export default function Home() {
  const [showBalance, setShowBalance] = useState(true);
  const [greeting, setGreeting] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    const getCurrentMonth = () => {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const currentMonthIndex = new Date().getMonth();
      setCurrentMonth(months[currentMonthIndex]);
    };

    getGreeting();
    getCurrentMonth();

    const interval = setInterval(() => {
      getGreeting();
      getCurrentMonth();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleHideBalance = () => {
    setShowBalance(!showBalance);
  };

  return (
    <View
      style={{
        paddingTop: 20,
        paddingVertical: verticalScale(10),
        paddingHorizontal: horizontalScale(10),
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            columnGap: moderateScale(10),
            alignSelf: 'center',
          }}>
          <View>
            <Image source={IMAGES.DP} />
          </View>
          <View>
            <Text
              style={{
                fontFamily: FONTS.w600,
                fontSize: moderateScale(14),
                color: 'rgba(89,86,86,1)',
              }}>
              {greeting}
            </Text>
            <Text
              style={{
                fontFamily: FONTS.w700,
                fontSize: moderateScale(18),
                color: COLORS.BLACK,
              }}>
              Guest 56235
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={{justifyContent: 'flex-end', alignSelf: 'center'}}
          onPress={() => console.log('notification')}
          activeOpacity={0.9}>
          <Image source={IMAGES.BELL} />
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={IMAGES.HEROBG}
          style={{
            width: horizontalScale(357),
            height: verticalScale(152),
            marginTop: 20,
            borderRadius: moderateScale(12),
          }}
          resizeMode="cover"
        />
        <View style={{position: 'absolute', top: 30, left: 10, right: 10}}>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text
              style={{
                color: 'white',
                fontFamily: FONTS.w700,
                fontSize: moderateScale(14),
              }}>
              {currentMonth} Records
            </Text>
            <TouchableOpacity onPress={handleHideBalance} activeOpacity={0.9}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  fontFamily: FONTS.w500,
                  fontSize: moderateScale(13),
                  color: 'white',
                }}>
                {showBalance ? 'Show Balance' : 'Hide Balance'}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 2,
              backgroundColor: COLORS.WHITE,
              marginTop: 10,
            }}></View>
          <View style={{alignItems: 'center', paddingTop: 20}}>
            <Text
              style={{
                fontFamily: FONTS.w500,
                fontSize: moderateScale(16),
                color: COLORS.WHITE,
              }}>
              Total Balance
            </Text>
            <Text
              style={{
                fontFamily: FONTS.w800,
                color: COLORS.WHITE,
                fontSize: moderateScale(26),
              }}>
              {showBalance ? 'xxxxxxx' : '$652,023.36'}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <HomeScreenCard
            title={'Income'}
            amount={'$738,560'}
            image={IMAGES.INCOMEICON}
          />
          <HomeScreenCard
            title={'Expense'}
            amount={'$86,536.64'}
            image={IMAGES.EXPENSEICON}
          />
        </View>
      </View>
    </View>
  );
}
