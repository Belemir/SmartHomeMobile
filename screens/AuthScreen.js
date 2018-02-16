import React, { Component } from 'react';
import { Text, View, StatusBar } from 'react-native';

import LoginPageScreen from './LoginPageScreen';

class AuthScreen extends Component{

    render(){
        return(
        <View style={styles.viewStyle}>
            <StatusBar
                backgroundColor="#1c313a"
                barStyle="light-content"
            />
            <LoginPageScreen />
        </View>
       )
    }
}

const styles = {
    buttonStyle : {
        justifyContent : 'center',
        alignItems : 'center'
    },
    viewStyle : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: '#455a64'
    }
}
export default AuthScreen;