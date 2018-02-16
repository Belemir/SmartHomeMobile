import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import AssistantScreen from './screens/AssistantScreen';
import AboutUsScreen from './screens/AboutUsScreen';
import ShowStatusScreen from './screens/ShowStatusScreen';
import LoginPageScreen from './screens/LoginPageScreen';
import SignUpPageScreen from './screens/SignUpPageScreen';
import AuthForm from './components/AuthForm';

export default class App extends React.Component {
  render() {

    const MainNavigation = TabNavigator({

      Welcome : { screen : WelcomeScreen },
      LoginPage : { screen : LoginPageScreen },
      SignUpPage : { screen : SignUpPageScreen },
      AuthForm : { screen : AuthForm},
      Main : { 
        screen : TabNavigator({
          ShowStatus : { screen : ShowStatusScreen },
          Assistant : { screen : AssistantScreen },
          AboutUs : { screen : AboutUsScreen }
        },{
          navigationOptions : {
            tabBarVisible : true
          }
        })
       }
    },{

      navigationOptions : {
        tabBarVisible: false
      }
    });

    return (
      // <Provider store={store}>
        <View style={styles.container}>
            <MainNavigation />
        </View>
      // </Provider>
    );
   
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
