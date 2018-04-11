import React, { Component } from 'react';
import {  StyleSheet, View, Text, Image } from 'react-native'; 
import socketIOClient from 'socket.io-client';
import Icon from 'react-native-vector-icons/Ionicons';
import GridView from 'react-native-super-grid';
import Images from '@assets/images';

const LOADING_TEXT = "Fetching Data ...";

class StatusScreen extends Component{

  constructor() {
    super();
    
    this.state = {
      heatStatus: LOADING_TEXT,
      gasStatus: LOADING_TEXT,
      garageStatus: 'Garage is Closed',
      rainStatus: LOADING_TEXT,
      motionStatus: LOADING_TEXT,
      lightStatus: LOADING_TEXT,
      endpoint: "http://192.168.1.109:8888",
      isLoggedIn: true
    }; 
  }

  

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);  
    socket.on("sendingsensordata", data => this.setState({ 
      heatStatus: data.dhtstatus,
      motionStatus: data.motionstatus,
      lightStatus: data.lightstatus,
      rainStatus: data.rainstatus 
    }));
  }

  _handleGarageButton = () =>{
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    this.setState({
      garageStatus: !this.state.garageStatus
    })
    socket.emit('garagedata',{ garagedata: this.state.garageStatus });
  }

    render(){   

      let { 
        isLoggedIn,
        heatStatus,
        gasStatus, 
        garageStatus,
        rainStatus,
        lightStatus,
        motionStatus
      } = this.state;

       
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
        content:  garageStatus 
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
        content: heatStatus
      },
      { 
        name: 'Living Room Light', 
        code: '#2980b9', imgurl:  
        Images.lightIcon, 
        content: heatStatus
      },
      { 
        name: 'Garage Light', 
        code: '#8e44ad', 
        imgurl:  Images.lightIcon, 
        content: heatStatus
      }
    ];
    

          return (
            <GridView
              itemDimension={130}
              items={items}
              style={styles.gridView}
              renderItem={item => (
                <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
                
                  <Image 
                    source={item.imgurl}
                    style={styles.imageStyle}
                    />

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