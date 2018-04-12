import React from 'react';
import { Text,
         Button,
         StyleSheet,
         View, 
         TouchableOpacity, 
         Image } from 'react-native';
import { Speech } from 'expo';
import Touchable from 'react-native-platform-touchable'; // 1.1.1
import Images from '@assets/images';

const ASSISTANT_INITIAL_SPEECH = 'Hello, I am your assistant, data from sensors are being fetched, you can check home status by clicking center of the screen';

export default class AssistantScreen extends React.Component {

  state = {
    speechText: ASSISTANT_INITIAL_SPEECH,
    inProgress: false,
    pitch: 1,
    rate: 1,
  };

  componentDidMount(){
    this._speak();
  }

  render() {
    return (
        <View style={styles.container}>
          {/* <Button
            disabled={this.state.inProgress}
            onPress={this._speak}
            title="Speak"
            style={styles.speakButtonStyle}
          /> */}

          <TouchableOpacity
            style={ styles.speakButtonStyle}
            onPress={this._speak}
          >
          <Image
              source={Images.assistantIcon}
              style={styles.assistantIconStyle}
          />
          </TouchableOpacity>

          {/* <Button
            disabled={!this.state.inProgress}
            onPress={this._stop}
            title="Stop"
            style={styles.stopButtonStyle}
          /> */}
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