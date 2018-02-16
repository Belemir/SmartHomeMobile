import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

import Logo from '../components/Logo';
import AuthForm from '../components/AuthForm';

class SignUpPageScreen extends Component{

    _goLogin = () => {
        this.props.navigation.navigate('LoginPage');
    }

        render(){
            return(
                <View style={styles.viewStyle}>
                    <Logo />
                    <AuthForm type="Sign Up" navigation={this.props.navigation}/>
                    <View style={styles.signUpTextContent}>
                        <Text style={styles.signUpText}>Already have an account?</Text>
                        <TouchableOpacity 
                            onPress={this._goLogin}
                        >
                            <Text style={styles.signUpButton}>
                            Login
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

export default SignUpPageScreen;