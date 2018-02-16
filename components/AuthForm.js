import React, { Component } from 'react';
import { Text,
         View,
         TextInput,
         TouchableOpacity
        } from 'react-native';

class AuthForm extends Component{

    _goStatusPage = () => {
        this.props.navigation.navigate('Main');
    }
  
    render(){
        return(
            <View style={styles.viewStyle}>
               <TextInput 
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Email"
                    placeholderTextColor="#fff"
                    selectionColor="#fff"
                    keyboardType="email-address"
                    onSubmitEditing={()=> this.password.focus()}
                />
                <TextInput 
                    style={styles.inputBox}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    placeholder="Password"
                    secureTextEntry
                    placeholderTextColor="#fff"
                    ref={(input) => this.password = input}
                />

                <TouchableOpacity 
                    style={styles.button}
                    onPress={this._goStatusPage}
                    >
                    <Text style={styles.buttonText}>{this.props.type}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = {
    viewStyle : {
        flexGrow : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
    inputBox : {
        width: 300,
        height: 50,
        backgroundColor : 'rgba(255,255,255,0.2)',
        borderRadius : 25,
        fontSize : 16,
        color : '#fff',
        marginVertical : 10
    },
    button : {
        width : 300,
        height: 50,
        backgroundColor : '#1c313a',
        borderRadius : 25,
        marginVertical : 10,
        paddingVertical : 13
    },
    buttonText :{
        fontSize : 16,
        fontWeight : '500',
        color : '#fff',
        textAlign : 'center'
    }
}

export default AuthForm;