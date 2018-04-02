import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatusScreen from '../screens/StatusScreen';
import WelcomeScreen from '../screens/WelcomeScreen'

export default TabNavigator(
  {
    Welcome: {
      screen: WelcomeScreen,
    },
    HomeStatus: {
      screen: StatusScreen,
    },
    Assistant: {
      screen: WelcomeScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Welcome':
            iconName =
              Platform.OS === 'ios'
                ? `ios-home${focused ? '' : '-outline'}`
                : 'ios-home';
            break;
          case 'HomeStatus':
            iconName = Platform.OS === 'ios' ? `ios-switch${focused ? '' : '-outline'}` : 'ios-switch';
            break;
          case 'Assistant':
            iconName =
              Platform.OS === 'ios' ? `ios-mic${focused ? '' : '-outline'}` : 'ios-mic';
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);
