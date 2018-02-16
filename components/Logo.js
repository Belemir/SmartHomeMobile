import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

class Logo extends Component{
    render(){
        return(
            <View style={styles.viewStyle}>
                <Image 
                    style={{width: 80, height: 70}}
                    source={require('../assets/icons/iot.png')}
                />
                <Text style={styles.logoText}>Welcome!</Text>
            </View>
        )
    }
}

const styles = {
    viewStyle : {
        flexGrow : 1,
        alignItems : 'center',
        justifyContent : 'flex-end'
    },
    logoText : {
        marginVertical : 15,
        fontSize : 18,
        color: 'rgba(255,255,255,0.7)'
    }
}

export default Logo;