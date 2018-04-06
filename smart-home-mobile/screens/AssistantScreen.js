import React, { Component } from 'react';
import {  StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import Images from '@assets/images';
import Speech from 'react-native-speech';
import Voice from 'react-native-voice';


class AssistantScreen extends Component{

    speech(){
        Speech.speak({
            text: 'Merhaba, bu bir testtir',
            voice: 'tr_TR'
        })
    }

    render(){
        const { containerStyle, textStyle, iconStyle } = styles   
          return (
            <View style={containerStyle}>
                <Image 
                    source={Images.iotIcon}
                    style={iconStyle}
                />
                <Text style={textStyle}>
                    Welcome To AssistantScreen
                </Text>

                <TouchableOpacity onPress={this.speech.bind()}>
                    <Text>Speak plz</Text>
                </TouchableOpacity>
               
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

        

export default AssistantScreen;