import React, { Component } from 'react';
import {  StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'; 
import socketIOClient from 'socket.io-client';
import { Speech } from 'expo';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import GridView from 'react-native-super-grid';
import { withNavigation } from 'react-navigation';
import Images from '@assets/images';


const LOADING_TEXT_EN = "Fetching Data ...";
const LOADING_TEXT_TR = "Veriler Yükleniyor ...";
const LOADING_TEXT_RU = "Получение Данных ...";

const ASSISTANT_INITIAL_SPEECH_RU = "На этой странице находится информация статусе дома. Еслм вы хотите получить помощь ассистента - просто нажмите на правый нижний угол экрана";
const ASSISTANT_INITIAL_SPEECH_EN = "This screen contains smart home status, If you want to get assistant support, just click the right corner on the bottom of the screen";
const ASSISTANT_INITIAL_SPEECH_TR = "Bu sayfa evinizin durumunu gösteriyor.Asistan desteğini almak istiyorsanız, ekranın altındaki sağ köşeye tıklayın."

const endpoint = "http://192.168.1.109:8888";
const socket = socketIOClient(endpoint); 

let heatHumidityName = '';
let gasStatusName = '';
let garageDoorName = '';
let rainStatusName = '';
let motionStatusName = '';
let lightStatusName = '';
let kitchenLightName = '';
let livingRoomLightName = '';
let garageLightName = '';
let gardenLightName = '';

let garageDoorSpeech = '';
let livingRoomLightSpeech = '';
let garageLightSpeech = '';
let kitchenLightSpeech = '';
let gardenLightSpeech = '';

let garageDoorTitle = '';
let kitchenLightTitle = '';
let garageLightTitle = '';
let livingRoomLightTitle = '';
let heatStatus = '';
let gardenLightTitle = '';

class StatusScreen extends Component{

  constructor() {
    super();
    
    this.state = {
      temperature: LOADING_TEXT_EN,
      humidity: '',
      gasStatus: LOADING_TEXT_EN,
      garageStatus: false,
      rainStatus: LOADING_TEXT_EN,
      motionStatus: LOADING_TEXT_EN,
      lightStatus: LOADING_TEXT_EN,
      endpoint: "http://192.168.1.109:8888",
      isLoggedIn: true,
      kitchenLightStatus: false,
      livingRoomLightStatus: false,
      garageLightStatus: false,
      gardenLightStatus: false,
      languageSelected: 'en',
      speechText: ASSISTANT_INITIAL_SPEECH_EN ,
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
  
  _handleIconClick = iconName => {

    let { garageStatus,
          livingRoomLightStatus,
          garageLightStatus,
          kitchenLightStatus,
          gardenLightStatus
        } = this.state;


    
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
        

        case 'Garden Light':
        this.setState({
          gardenLightStatus: !this.state.gardenLightStatus,
          speechText: gardenLightSpeech
        }, () => {
          socket.emit('gardenLightEvent',{ gardenLightData: this.state.garageLightStatus });
          this._speak();
        });
        break;
    }
 }

 _setLangContent = lang => {

  let { 
    isLoggedIn,
    temperature,
    humidity,
    gasStatus, 
    garageStatus,
    rainStatus,
    lightStatus,
    motionStatus,
    kitchenLightStatus,
    garageLightStatus,
    gardenLightStatus,
    livingRoomLightStatus
  } = this.state;

  switch(lang){
    case 'English':

       heatHumidityName = 'Heat & Humidity';
       gasStatusName = 'Gas Status';
       garageDoorName = 'Garage Door';
       rainStatusName = 'Rain Status';
       motionStatusName = 'Motion Status';
       lightStatusName = 'Light Status';
       kitchenLightName = 'Kitchen Light';
       livingRoomLightName = 'Living Room Light';
       garageLightName = 'Garage Light';
       gardenLightName = 'Garden Light';
   
       garageDoorSpeech = garageStatus ? 'Garage was closed' : 'Garage was opened';
       livingRoomLightSpeech = livingRoomLightStatus ? 'Living room light was switched off' : 'Living room light was switched on';
       garageLightSpeech = garageLightStatus ? 'Garage light was switched off' : 'Garage light was switched on';
       kitchenLightSpeech = kitchenLightStatus ? 'Kitchen light was switched off' : 'Kitchen light was switched on';
       gardenLightSpeech = gardenLightStatus ? 'Garden light was switched off' : 'Garden light was switched on';

       garageDoorTitle = garageStatus ? 'Garage is OPEN' : 'Garage is CLOSED';
       kitchenLightTitle = kitchenLightStatus ? 'Light is ON' : 'Light is OFF';
       garageLightTitle = garageLightStatus ? 'Light is ON' : 'Light is OFF';
       livingRoomLightTitle = livingRoomLightStatus ? 'Light is ON' : 'Light is OFF';
       heatStatus = `${temperature} C / ${humidity} %`;
       gardenLightTitle = gardenLightStatus ? 'Light is ON' : 'Light is OFF';
      
      this.setState({ 
        languageSelected: 'en',
        speechText: ASSISTANT_INITIAL_SPEECH_EN,
        loadingText: LOADING_TEXT_EN
      }, () => {
        this._speak();
      });
      break;

    case 'Turkish':

       heatHumidityName = 'Isı ve Nem';
       gasStatusName = 'Gaz Sensörü';
       garageDoorName = 'Garaj Kapısı';
       rainStatusName = 'Yağmur Sensörü';
       motionStatusName = 'Hareket Sensörü';
       lightStatusName = 'Işık Sensörü';
       kitchenLightName = 'Mutfak Işığı';
       livingRoomLightName = 'Salon Işığı';
       garageLightName = 'Garaj Işığı';
       gardenLightName = 'Bahçe Işığı';

       garageDoorSpeech = garageStatus ? 'Garaj kapatıldı' : 'Garaj açıldı';
       livingRoomLightSpeech = livingRoomLightStatus ? 'Salon ışığı kapatıldı' : 'Salon ışığı açıldı';
       garageLightSpeech = garageLightStatus ? 'Garaj ışığı kapatıldı' : 'Garaj ışığı açıldı';
       kitchenLightSpeech = kitchenLightStatus ? 'Mutfak ışığı kapatıldı' : 'Mutfak ışığı açıldı';
       gardenLightSpeech = gardenLightStatus ? 'Bahçe ışığı kapatıldı' : 'Bahçe ışığı açıldı';

       garageDoorTitle = garageStatus ? 'Garaj AÇIK' : 'Garaj KAPALI';
       kitchenLightTitle = kitchenLightStatus ? 'Işık AÇIK' : 'Işık KAPALI';
       garageLightTitle = garageLightStatus ? 'Işık AÇIK' : 'Işık KAPALI';
       livingRoomLightTitle = livingRoomLightStatus ? 'Işık AÇIK' : 'Işık KAPALI';
       heatStatus = `${temperature} C / ${humidity} %`;
       gardenLightTitle = gardenLightStatus ? 'Işık AÇIK' : 'Işık KAPALI';

      this.setState({ 
        languageSelected : 'tr',
        speechText: ASSISTANT_INITIAL_SPEECH_TR,
        loadingText: LOADING_TEXT_TR
       }, () => {
        this._speak();
      });
      break;


    case 'Russian':

      heatHumidityName = 'Температура и Влажность';
      gasStatusName = 'Датчик Газа';
      garageDoorName = 'Гаражная Дверь';
      rainStatusName = 'Датчик Дождя';
      motionStatusName = 'Датчик Движения';
      lightStatusName = 'Датчик Света';
      kitchenLightName = 'Свет в Кухне';
      livingRoomLightName = 'Свет в Зале';
      garageLightName = 'Свет в Гараже';
      gardenLightName = 'Свет в Саду';

      garageDoorSpeech = garageStatus ? 'Гараж Закрыт' : 'Гараж Открыт';
      livingRoomLightSpeech = livingRoomLightStatus ? 'Свет в Зале Выключен' : 'Свет в Зале Включён';
      garageLightSpeech = garageLightStatus ? 'Свет в Гараже Выключен' : 'Свет в Гараже Включён';
      kitchenLightSpeech = kitchenLightStatus ? 'Свет в Кухне Выключен' : 'Свет в Кухне Включён';
      gardenLightSpeech = gardenLightStatus ? 'Свет в Саду Выключен' : 'Свет в Саду Включён';

      garageDoorTitle = garageStatus ? 'Гараж Открыт' : 'Гараж Закрыт';
      kitchenLightTitle = kitchenLightStatus ? 'Свет Включён' : 'Свет Выключен';
      garageLightTitle = garageLightStatus ? 'Свет Включён' : 'Свет Выключен';
      livingRoomLightTitle = livingRoomLightStatus ? 'Свет Включён' : 'Свет Выключен';
      heatStatus = `${temperature} C / ${humidity} %`;
      gardenLightTitle = gardenLightStatus ? 'Свет Включён' : 'Свет Выключен';

    this.setState({ 
      languageSelected : 'ru-Latn',
      speechText: ASSISTANT_INITIAL_SPEECH_RU,
      loadingText: LOADING_TEXT_RU
      }, () => {
      this._speak();
    });
    break;
 }
 }
 _setSelectedLang = lang => {
  switch(lang){
    case 'English':

      this.setState({
        temperature: LOADING_TEXT_EN,
        gasStatus: LOADING_TEXT_EN,
        rainStatus: LOADING_TEXT_EN,
        motionStatus: LOADING_TEXT_EN,
        lightStatus: LOADING_TEXT_EN
      });
      break;

    case 'Turkish':

      this.setState({
        temperature: LOADING_TEXT_TR,
        gasStatus: LOADING_TEXT_TR,
        rainStatus: LOADING_TEXT_TR,
        motionStatus: LOADING_TEXT_TR,
        lightStatus: LOADING_TEXT_TR
      });
      break;

    case 'Russian':

      this.setState({
        temperature: LOADING_TEXT_RU,
        gasStatus: LOADING_TEXT_RU,
        rainStatus: LOADING_TEXT_RU,
        motionStatus: LOADING_TEXT_RU,
        lightStatus: LOADING_TEXT_RU
      });
      break;
  }
 }
 
  componentWillMount(){
    this._setSelectedLang(this.props.langSelected);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.langSelected !== this.props.langSelected){
      this._setSelectedLang(nextProps.langSelected);
      this._setLangContent(nextProps.langSelected);
    }
  }
  
 
  componentDidMount() {

    
    this._setSelectedLang(this.props.langSelected);
    this._setLangContent(this.props.langSelected)
    
    // this._speak(); 
    socket.on("sendingsensordata", data => this.setState({ 
      temperature: data.temperature,
      humidity: data.humidity,
      motionStatus: data.motionStatus,
      lightStatus: data.lightStatus,
      rainStatus: data.rainStatus,
      gasStatus: data.gasStatus,
      garageStatus: data.garageStatus,
      kitchenLightStatus: data.kitchenLightStatus,
      livingRoomLightStatus: data.livingRoomLightStatus,
      garageLightStatus: data.garageLightStatus,
      gardenLightStatus: data.gardenLightStatus 
    }));
  }

    render(){   

    let { 
      isLoggedIn,
      temperature,
      humidity,
      gasStatus, 
      garageStatus,
      rainStatus,
      lightStatus,
      motionStatus,
      kitchenLightStatus,
      garageLightStatus,
      gardenLightStatus,
      livingRoomLightStatus
    } = this.state;

    // let garageDoorTitle = garageStatus ? 'Garage is OPEN' : 'Garage is CLOSED';
    // let kitchenLightTitle = kitchenLightStatus ? 'Light is ON' : 'Light is OFF';
    // let garageLightTitle = garageLightStatus ? 'Light is ON' : 'Light is OFF';
    // let livingRoomLightTitle = livingRoomLightStatus ? 'Light is ON' : 'Light is OFF';
    // let heatStatus = `${temperature} C / ${humidity} %`;
    // let gardenLightTitle = gardenLightStatus ? 'Light is ON' : 'Light is OFF';
       
    const items = [
      { 
        name: heatHumidityName,
        code: '#1abc9c', 
        imgurl: Images.temperatureIcon,
        content:  heatStatus
      },
      { 
        name: gasStatusName,
        code: '#2ecc71', 
        imgurl: Images.gasIcon, 
        content: gasStatus
       },
      { 
        name: garageDoorName, 
        code: '#3498db', 
        imgurl: Images.garageIcon, 
        content:  garageDoorTitle 
      },
      { 
        name: rainStatusName, 
        code: '#9b59b6', 
        imgurl: Images.rainIcon, 
        content: rainStatus
      },
      { 
        name: motionStatusName, 
        code: '#34495e', 
        imgurl: Images.motionIcon, 
        content: motionStatus
      },
      { 
        name: lightStatusName, 
        code: '#16a085', 
        imgurl: Images.lightIcon, 
        content: lightStatus
      },
      { 
        name: kitchenLightName, 
        code: '#27ae60', 
        imgurl:  Images.lightIcon, 
        content: kitchenLightTitle
      },
      { 
        name: livingRoomLightName, 
        code: '#2980b9', imgurl:  
        Images.lightIcon, 
        content: livingRoomLightTitle
      },
      { 
        name: garageLightName, 
        code: '#8e44ad', 
        imgurl:  Images.lightIcon, 
        content: garageLightTitle
      },
      { 
        name: gardenLightName, 
        code: '#34495e', 
        imgurl:  Images.lightIcon, 
        content: gardenLightTitle
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

      const mapStateToProps = state => {
        const { langSelected } = state.lang;
        return { langSelected };
      }
        

export default connect(mapStateToProps, {})(withNavigation(StatusScreen));