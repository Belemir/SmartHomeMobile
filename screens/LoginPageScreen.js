import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StatusBar } from 'react-native';

import Logo from '../components/Logo';
import AuthForm from '../components/AuthForm';

class LoginPageScreen extends Component{

    _goSignUp = () => {
        this.props.navigation.navigate('SignUpPage');
    }

        render(){
            return(
                <View style={styles.viewStyle}>
                    <StatusBar
                        backgroundColor="#1c313a"
                        barStyle="light-content"
                    />
                    <Logo />
                    <AuthForm type="Login" navigation={this.props.navigation}/>
                    <View style={styles.signUpTextContent}>
                        <Text style={styles.signUpText}>Dont have account yet?</Text>
                        <TouchableOpacity 
                            onPress={this._goSignUp}
                        >
                            <Text style={styles.signUpButton}>
                            Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

}

const styles = {
    viewStyle : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: '#455a64'
    },
    signUpTextContent :{
        flexGrow : 1,
        justifyContent : 'center',
        alignItems : 'flex-end',
        paddingVertical : 16,
        flexDirection : 'row'
    },
    signUpText : {
        color : 'rgba(255,255,255,0.6)',
        fontSize : 16
    },
    signUpButton : {
        color : '#fff',
        fontSize : 16,
        fontWeight : '500'
    }
}

export default LoginPageScreen;