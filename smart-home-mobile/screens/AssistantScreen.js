import React from 'react';
import { Text,
         Button,
         StyleSheet,
         View, 
         TouchableOpacity, 
         Image } from 'react-native';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { Speech } from 'expo';
import { withNavigation } from 'react-navigation';
import Touchable from 'react-native-platform-touchable'; // 1.1.1
import Images from '@assets/images';


const LOADING_TEXT_EN = "Fetching Data ...";
const LOADING_TEXT_TR = "Veriler Yükleniyor ...";
const LOADING_TEXT_RU = "Получение Данных ...";


const ASSISTANT_INITIAL_SPEECH_RU = "На этой странице находится информация статусе дома. Еслм вы хотите получить помощь ассистента - просто нажмите на правый нижний угол экрана";
const ASSISTANT_INITIAL_SPEECH_EN = "Hello, I am your assistant, data from sensors are being fetched, you can check home status by clicking center of the screen";
const ASSISTANT_INITIAL_SPEECH_TR = "Bu sayfa evinizin durumunu gösteriyor.Asistan desteğini almak istiyorsanız, ekranın altındaki sağ köşeye tıklayın."


const endpoint = "http://192.168.1.109:8888";
const socket = socketIOClient(endpoint); 

class AssistantScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      temperature: LOADING_TEXT_EN,
      humidity: LOADING_TEXT_EN,
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
      speechText: ASSISTANT_INITIAL_SPEECH_EN ,
      inProgress: false,
      pitch: 1,
      rate: 1,
    }; 
  };

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

  componentDidMount(){

    this._setSelectedLang(this.props.langSelected);

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


const mapStateToProps = state => {
  const { langSelected } = state.lang;
  return { langSelected };
}

export default connect(mapStateToProps, {})(withNavigation(AssistantScreen));