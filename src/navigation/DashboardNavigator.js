import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/dashboard/Home';
import Report from '../screens/dashboard/Report';
import Planning from '../screens/dashboard/Planning';
import Profile from '../screens/dashboard/Profile';
import {COLORS, FONTS, IMAGES} from '../constants';
import {Image, Modal, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, verticalScale} from '../utlis/Metrics';

const home = 'Home';
const report = 'Report';
const planning = 'Planning';
const profile = 'Profile';

const Tab = createBottomTabNavigator();

export default function DashboardNavigator() {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={{flex: 1}}>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            let iconName;
            let rn = route.name;

            if (rn === home) {
              iconName = focused ? IMAGES.HOME_FOCUSED : IMAGES.HOME;
            } else if (rn === report) {
              iconName = focused ? IMAGES.REPORT_FOCUSED : IMAGES.REPORT;
            } else if (rn === planning) {
              iconName = focused ? IMAGES.PLANNING_FOCUSED : IMAGES.PLANNING;
            } else if (rn === profile) {
              iconName = focused ? IMAGES.PROFILE_FOCUSED : IMAGES.PROFILE;
            }
            return <Image source={iconName} />;
          },
          headerShown: false,
          tabBarActiveTintColor: COLORS.PRIMARY,
          tabBarInactiveTintColor: COLORS.TABBAR,
          tabBarStyle: {
            height: verticalScale(70),
            borderTopLeftRadius: moderateScale(40),
            borderTopRightRadius: moderateScale(40),
            shadowColor: 'rgba(0,0,0,0.15)',
            shadowOffset: {width: 0, height: 3},
            shadowRadius: 7,
          },
          tabBarLabelStyle: {
            fontFamily: FONTS.w500,
            fontSize: moderateScale(12),
          },
        })}>
        <Tab.Screen
          name={home}
          component={Home}
          options={{tabBarLabel: 'HOME'}}
        />
        <Tab.Screen
          name={report}
          component={Report}
          options={{tabBarLabel: 'REPORT'}}
        />
        <Tab.Screen
          name={planning}
          component={Planning}
          options={{tabBarLabel: 'PLANNING'}}
        />
        <Tab.Screen
          name={profile}
          component={Profile}
          options={{tabBarLabel: 'PROFILE'}}
        />
      </Tab.Navigator>
      <TouchableOpacity activeOpacity={0.9} onPress={toggleModal}>
        <View
          style={{
            position: 'absolute',
            backgroundColor: COLORS.PRIMARY,
            height: 50,
            width: 50,
            borderRadius: 25,
            bottom: 40,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
            shadowColor: 'rgba(0,0,0,0.5)',
            shadowOffset: {width: 0, height: 3},
            shadowOpacity: 1,
            shadowRadius: 10,
            elevation: 5,
          }}>
          {modalVisible ? (
            <Image source={IMAGES.CROSS} />
          ) : (
            <Image source={IMAGES.PLUS} />
          )}
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            bottom: 70,
          }}>
          <View style={{bottom: 0}}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                width: 353,
                borderRadius: 10,
              }}>
              <Text
                style={{
                  fontFamily: FONTS.w700,
                  fontSize: 18,
                  color: COLORS.BLACK,
                }}>
                Select Category
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                }}>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  activeOpacity={0.9}>
                  <Image source={IMAGES.INCOME} />
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontFamily: FONTS.w500,
                      fontSize: 14,
                    }}>
                    Income
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{alignItems: 'center'}}
                  activeOpacity={0.9}>
                  <Image source={IMAGES.EXPENSE} />
                  <Text
                    style={{
                      color: COLORS.BLACK,
                      fontFamily: FONTS.w500,
                      fontSize: 14,
                    }}>
                    Expense
                  </Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={toggleModal}
                style={{justifyContent: 'flex-end', alignSelf: 'center'}}>
                <View
                  style={{
                    position: 'relative',
                    backgroundColor: COLORS.PRIMARY,
                    height: 50,
                    width: 50,
                    borderRadius: 25,
                  }}>
                    
                  </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
