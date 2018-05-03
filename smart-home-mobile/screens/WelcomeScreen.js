import React, { Component } from 'react';
import {  StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import Images from '@assets/images';
import { Speech } from 'expo';


const ASSISTANT_INITIAL_SPEECH_EN = "Welcome to the smart home simulator, If you want to get assistant support, just click the right corner on the bottom of the screen";
const ASSISTANT_INITIAL_SPEECH_TR = "Akıllı ev simülatörüne hoş geldiniz, Asistan desteğini almak istiyorsanız, ekranın altındaki sağ köşeye tıklayın.";
const ASSISTANT_INITIAL_SPEECH_RU = "Добро пожаловать в интеллектуальный домашний симулятор. Если вы хотите получить поддержку помощника, просто нажмите правый угол внизу экрана";
class WelcomeScreen extends Component{

    state = {
        speechText: ASSISTANT_INITIAL_SPEECH_EN,
        inProgress: false,
        pitch: 1,
        rate: 1,
        languageSelected: 'en'
      };

      componentDidMount(){
          this._handleLangSelection(this.state.languageSelected); 
      }

      _handleLangSelection = lang => {
        switch(lang){
          case 'Turkish':
            this.setState({ 
              languageSelected : 'tr',
              speechText: ASSISTANT_INITIAL_SPEECH_TR
            }, () => {
              this._speak();
            });
            break;
          
          case 'Russian':
            this.setState({
              languageSelected : 'ru-Latn',
              speechText: ASSISTANT_INITIAL_SPEECH_RU
            }, () => {
              this._speak();
            });
            break;
          
          case 'English':
            this.setState({
              languageSelected : 'en',
              speechText: ASSISTANT_INITIAL_SPEECH_EN
            }, () => {
              this._speak();
            });
            break;
        }
      }

    
      _speak = () => {
        const start = () => {
          this.setState({ inProgress: true });
        };
        const complete = () => {
          this.state.inProgress && this.setState({ inProgress: false });
        };
    
        Speech.speak(this.state.speechText, {
          language: this.state.languageSelected,
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

                <View>
                  <TouchableOpacity onPress={() => this._handleLangSelection('Turkish')}>
                    <Image 
                      source={Images.TurkeyFlag}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this._handleLangSelection('Russian')}>
                    <Image 
                      source={Images.RussiaFlag} 
                    />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this._handleLangSelection('English')}>
                    <Image 
                      source={Images.UkFlag} 
                    />
                  </TouchableOpacity>
                 </View>
               
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