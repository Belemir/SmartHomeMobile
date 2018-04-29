import React, { Component } from 'react';
import {  StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'; 
import socketIOClient from 'socket.io-client';
import { Speech } from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import GridView from 'react-native-super-grid';
import Images from '@assets/images';

const LOADING_TEXT = "Fetching Data ...";
const ASSISTANT_INITIAL_SPEECH = "This screen contains smart home status, If you want to get assistant support, just click the right corner on the bottom of the screen";


const endpoint = "http://192.168.1.109:8888";
const socket = socketIOClient(endpoint); 

class StatusScreen extends Component{

  constructor() {
    super();
    
    this.state = {
      heatStatus: LOADING_TEXT,
      gasStatus: LOADING_TEXT,
      garageStatus: false,
      rainStatus: LOADING_TEXT,
      motionStatus: LOADING_TEXT,
      lightStatus: LOADING_TEXT,
      endpoint: "http://192.168.1.109:8888",
      isLoggedIn: true,
      kitchenLightStatus: false,
      livingRoomLightStatus: false,
      garageLightStatus: false,
      speechText: ASSISTANT_INITIAL_SPEECH ,
      inProgress: false,
      pitch: 1,
      rate: 1,
    }; 
  };

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
  
  _handleIconClick = iconName => {

    let { garageStatus,
          livingRoomLightStatus,
          garageLightStatus,
          kitchenLightStatus
        } = this.state;

    let garageDoorSpeech = garageStatus ? 'Garage was closed' : 'Garage was opened';
    let livingRoomLightSpeech = livingRoomLightStatus ? 'Living room light was switched off' : 'Living room light was switched on';
    let garageLightSpeech = garageLightStatus ? 'Garage light was switched off' : 'Garage light was switched on';
    let kitchenLightSpeech = kitchenLightStatus ? 'Kitchen light was switched off' : 'Kitchen light was switched on';
    
    switch(iconName){
      case 'Garage Door':
           this.setState({
             garageStatus: !this.state.garageStatus,
             speechText: garageDoorSpeech
           }, () => {
             socket.emit('garageDoorEvent',{ garageData: this.state.garageStatus });
             this._speak();
           });
           break;


       
       case 'Kitchen Light':
           this.setState({
             kitchenLightStatus: !this.state.kitchenLightStatus,
             speechText: kitchenLightSpeech
           }, () => {
             socket.emit('kitchenLightEvent',{ kitchenLightData: this.state.kitchenLightStatus });
             this._speak();
           });
           break;

       case 'Living Room Light':
           this.setState({
             livingRoomLightStatus: !this.state.livingRoomLightStatus,
             speechText: livingRoomLightSpeech
           }, () => {
             socket.emit('livingRoomLightEvent',{ livingRoomLightData: this.state.livingRoomLightStatus });
             this._speak();
           });
           break;

       case 'Garage Light':
           this.setState({
             garageLightStatus: !this.state.garageLightStatus,
             speechText: garageLightSpeech
           }, () => {
             socket.emit('garageLightEvent',{ garageLightData: this.state.garageLightStatus });
             this._speak();
           });
           break;
    }
 }
 
  componentDidMount() { 
    socket.on("sendingsensordata", data => this.setState({ 
      heatStatus: data.dhtstatus,
      motionStatus: data.motionstatus,
      lightStatus: data.lightstatus,
      rainStatus: data.rainstatus 
    }));
    this._speak();
  }

    render(){   

    let { 
      isLoggedIn,
      heatStatus,
      gasStatus, 
      garageStatus,
      rainStatus,
      lightStatus,
      motionStatus,
      kitchenLightStatus,
      garageLightStatus,
      livingRoomLightStatus
    } = this.state;

    let garageDoorTitle = garageStatus ? 'Garage is OPEN' : 'Garage is CLOSED';
    let kitchenLightTitle = kitchenLightStatus ? 'Light is ON' : 'Light is OFF';
    let garageLightTitle = garageLightStatus ? 'Light is ON' : 'Light is OFF';
    let livingRoomLightTitle = livingRoomLightStatus ? 'Light is ON' : 'Light is OFF';
       
    const items = [
      { 
        name: 'Heat & Humidity:',
        code: '#1abc9c', 
        imgurl: Images.temperatureIcon,
        content:  heatStatus
      },
      { 
        name: 'Gas Status:',
        code: '#2ecc71', 
        imgurl: Images.gasIcon, 
        content: gasStatus
       },
      { 
        name: 'Garage Door', 
        code: '#3498db', 
        imgurl: Images.garageIcon, 
        content:  garageDoorTitle 
      },
      { 
        name: 'Rain Status:', 
        code: '#9b59b6', 
        imgurl: Images.rainIcon, 
        content: rainStatus
      },
      { 
        name: 'Motion Status', 
        code: '#34495e', 
        imgurl: Images.motionIcon, 
        content: motionStatus
      },
      { 
        name: 'Light Status', 
        code: '#16a085', 
        imgurl: Images.lightIcon, 
        content: lightStatus
      },
      { 
        name: 'Kitchen Light', 
        code: '#27ae60', 
        imgurl:  Images.lightIcon, 
        content: kitchenLightTitle
      },
      { 
        name: 'Living Room Light', 
        code: '#2980b9', imgurl:  
        Images.lightIcon, 
        content: livingRoomLightTitle
      },
      { 
        name: 'Garage Light', 
        code: '#8e44ad', 
        imgurl:  Images.lightIcon, 
        content: garageLightTitle
      }
    ];
    

          return (
            <GridView
              itemDimension={130}
              items={items}
              style={styles.gridView}
              renderItem={item => (
                <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                  <TouchableOpacity onPress={() => this._handleIconClick(item.name)}>
                    <Image 
                      source={item.imgurl}
                      style={styles.imageStyle}
                      />
                   </TouchableOpacity> 

                  <Text style={styles.itemName}>
                  { item.name }
                  </Text>

                  <Text style={styles.itemCode}>
                  { item.content }
                  </Text>

                </View>
              )}
            />
          );
        }
      }
      
      const styles = StyleSheet.create({
        gridView: {
          paddingTop: 25,
          flex: 1
        },
        itemContainer: {
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          padding: 10,
          height: 150,
        },
        itemName: {
          fontSize: 16,
          color: '#fff',
          fontWeight: 'bold',
        },
        itemCode: {
          fontWeight: '600',
          fontSize: 14,
          color: '#fff',
        },
        imageStyle: {
          width: 80,
          height: 80
        }
      });

        

export default StatusScreen;