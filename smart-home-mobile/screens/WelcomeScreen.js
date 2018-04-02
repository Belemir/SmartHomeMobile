import React, { Component } from 'react';
import {  StyleSheet, View, Text, Image } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import Images from '@assets/images';


class StatusScreen extends Component{

    render(){
        const { containerStyle, textStyle, iconStyle } = styles   
          return (
            <View style={containerStyle}>
                <Image 
                    source={Images.iotIcon}
                    style={iconStyle}
                />
                <Text style={textStyle}>
                    Welcome To Smart Home Simulator
                </Text>
               
            </View>
          );
        }
      }
      
      const styles = StyleSheet.create({
        containerStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1
        },
        textStyle: {
            fontWeight: 'bold',
            fontSize: 40,
            color: 'brown',
            textAlign: 'center'
        },
        iconStyle: {
            width: 200,
            height: 180
        }
      });

        

export default StatusScreen;