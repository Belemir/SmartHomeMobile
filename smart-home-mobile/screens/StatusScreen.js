import React, { Component } from 'react';
import {  StyleSheet, View, Text, Image } from 'react-native'; 
import Icon from 'react-native-vector-icons/Ionicons';
import GridView from 'react-native-super-grid';
import Images from '@assets/images';

const items = [
  { name: 'Heat & Humidity:', code: '#1abc9c', imgurl: Images.temperatureIcon },
  { name: 'Gas Status:',code: '#2ecc71', imgurl: Images.gasIcon },
  { name: 'Garage Door', code: '#3498db', imgurl: Images.garageIcon },
  { name: 'Rain Status:', code: '#9b59b6', imgurl: Images.rainIcon },
  { name: 'Motion Status', code: '#34495e', imgurl: Images.motionIcon},
  { name: 'Light Status', code: '#16a085', imgurl: Images.lightIcon },
  { name: 'Kitchen Light', code: '#27ae60', imgurl:  Images.lightIcon },
  { name: 'Living Room Light', code: '#2980b9', imgurl:  Images.lightIcon},
  { name: 'Garage Light', code: '#8e44ad', imgurl:  Images.lightIcon }
];


class StatusScreen extends Component{

    render(){   
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
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCode}>Fetching Data...</Text>
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