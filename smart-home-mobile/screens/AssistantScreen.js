import React from 'react';
import { Text,
         Button,
         StyleSheet,
         View, 
         TouchableOpacity, 
         Image } from 'react-native';
import socketIOClient from 'socket.io-client';
import { Speech } from 'expo';
import Touchable from 'react-native-platform-touchable'; // 1.1.1
import Images from '@assets/images';


const LOADING_TEXT = "Fetching Data ...";
const ASSISTANT_INITIAL_SPEECH = 'Hello, I am your assistant, data from sensors are being fetched, you can check home status by clicking center of the screen';


const endpoint = "http://192.168.1.109:8888";
const socket = socketIOClient(endpoint); 


export default class AssistantScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      temperature: LOADING_TEXT,
      humidity: LOADING_TEXT,
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
      gardenLightStatus: false,
      speechText: ASSISTANT_INITIAL_SPEECH ,
      inProgress: false,
      pitch: 1,
      rate: 1,
    }; 
  };

  componentDidMount(){
    this._speak();
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
    }, () => {
      this.setState({
        speechText: `Heat Status ${ this.state.temperature } celsius...
                     Humidity ${ this.state.humidity } percent ...
                      ${ this.state.rainStatus }...
                    `
      })
    }));
  }

  render() {
    return (
        <View style={styles.container}>
          

          <TouchableOpacity
            style={ styles.speakButtonStyle}
            onPress={this._speak}
          >
          <Image
              source={Images.assistantIcon}
              style={styles.assistantIconStyle}
          />
          </TouchableOpacity>

        
        </View>
    );
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
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center'
  },
  speakButtonStyle: {
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    height: 300,
    width: 300,
    backgroundColor:'orange',
    borderRadius:300,
    alignItems:'center',
    justifyContent:'center'
  },
  assistantIconStyle:{
    width: 200,
    height: 200
  },
  stopButtonStyle: {
    // i'm just not thinking about stop button right now, maybe in future ...
  }
});