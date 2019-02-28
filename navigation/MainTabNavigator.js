import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import AddEventScreen from '../screens/AddEventScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/home_screens/MapScreen';
import NewScreen from '../screens/home_screens/NewScreen';
import HotScreen from '../screens/home_screens/HotScreen';

const MapStack = createStackNavigator({
  Map: {screen: MapScreen, navigationOptions: {header: null}},
  AddEvent: {screen: AddEventScreen, navigationOptions: {header: null}},
})

MapStack.navigationOptions = ({navigation}) => {
  let tabBarVisible
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "AddEvent") {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    })
  }
  return {tabBarVisible}
}

const HomeStack = createMaterialTopTabNavigator({
  Map: MapStack,
  New: NewScreen,
  Hot: HotScreen,
},
{
  tabBarOptions: {
    style: {
      backgroundColor: '#4E2A84',
      height: 64,
      alignContent: 'center',
    },
    labelStyle: {
      paddingTop: 16,
      fontSize: 15,
      fontWeight: 'bold',
    },
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Events',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};


const ProfileStack = createStackNavigator({
  Profile: ProfileScreen,
});

ProfileStack.navigationOptions = {
  tabBarLabel: 'Saved',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};


export default createBottomTabNavigator(
  {
    HomeStack,
    ProfileStack,
    SettingsStack,
  },
  {
    tabBarOptions:{
      activeTintColor: '#4E2A84',
      inaactiveTintColor: '#fff'
    }
});
