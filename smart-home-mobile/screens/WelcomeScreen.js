import React, { Component } from 'react';
import {  StyleSheet, View, Text, Image } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import Images from '@assets/images';
import { Speech } from 'expo'


const ASSISTANT_INITIAL_SPEECH = "Welcome to the smart home simulator, If you want to get assistant support, just click the right corner on the bottom of the screen";

class WelcomeScreen extends Component{

    state = {
        speechText: ASSISTANT_INITIAL_SPEECH,
        inProgress: false,
        pitch: 1,
        rate: 1
      };

      componentDidMount(){
        this._speak();
      }
    
      _speak = () => {
        const start = () => {
          this.setState({ inProgress: true });
        };
        const complete = () => {
          this.state.inProgress && this.setState({ inProgress: false });
        };
    
        Speech.speak(this.state.speechText, {
          language: 'en',
          pitch: this.state.pitch,
          rate: this.state.rate,
          onStart: start,
          onDone: complete,
          onStopped: complete,
          onError: complete,
        });
      };
    
      _stop = () => {
        Speech.stop();
      };    

      
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

        

export default WelcomeScreen;