import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  View,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {horizontalScale, moderateScale, verticalScale} from '../utlis/Metrics';
import Home from '../screens/dashboard/Home';
import Report from '../screens/dashboard/Report';
import Planning from '../screens/dashboard/Planning';
import Profile from '../screens/dashboard/Profile';
import {COLORS, FONTS, IMAGES} from '../constants';
import {useNavigation} from '@react-navigation/native';

const home = 'Home';
const report = 'Report';
const planning = 'Planning';
const profile = 'Profile';

const Tab = createBottomTabNavigator();

export default function DashboardNavigator() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={{flex: 1}}>
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
              shadowRadius: moderateScale(7),
              
            },
            tabBarLabelStyle: {
              fontFamily: FONTS.w500,
              fontSize: moderateScale(12),
              bottom: moderateScale(5),
              paddingTop:moderateScale(10)
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
      </View>
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={toggleModal}
        style={styles.addButton}>
        <Image source={IMAGES.PLUS} />
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
            bottom: moderateScale(70),
          }}>
          <View style={{bottom: 0}}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Select Category</Text>
              <View style={styles.categoryContainer}>
                <TouchableOpacity
                  style={styles.categoryItem}
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.navigate('DashboardStack', {Screen: 'Income'})
                  }>
                  <Image source={IMAGES.INCOME} />
                  <Text style={styles.categoryText}>Income</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.categoryItem}
                  activeOpacity={0.9}
                  onPress={() =>
                    navigation.navigate('DashboardStack', {Screen: 'Expense'})
                  }>
                  <Image source={IMAGES.EXPENSE} />
                  <Text style={styles.categoryText}>Expense</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={toggleModal}
                style={styles.closeButton}
                activeOpacity={0.9}>
                <Image source={IMAGES.CROSS} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.arcContainer}>
        <View style={styles.arc}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    backgroundColor: COLORS.PRIMARY,
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    bottom: moderateScale(60),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: moderateScale(1),
    shadowRadius: moderateScale(10),
    elevation: moderateScale(5),
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: moderateScale(20),
    width: moderateScale(353),
    borderRadius: moderateScale(10),
  },
  modalHeader: {
    fontFamily: FONTS.w700,
    fontSize: moderateScale(18),
    color: COLORS.BLACK,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: moderateScale(20),
    paddingTop: moderateScale(20),
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryText: {
    color: COLORS.BLACK,
    fontFamily: FONTS.w500,
    fontSize: moderateScale(14),
  },
  closeButton: {
    position: 'absolute',
    bottom: moderateScale(-10),
    alignSelf: 'center',
    backgroundColor: COLORS.PRIMARY,
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  arcContainer: {
    position: 'absolute',
    bottom: moderateScale(50),
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden',
  },
  arc: {
    width: horizontalScale(200),
    height: verticalScale(100),
    backgroundColor: COLORS.WHITE,
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    transform: [{scaleX: 2}],
    position: 'absolute',
    bottom: -50,
  },
});
