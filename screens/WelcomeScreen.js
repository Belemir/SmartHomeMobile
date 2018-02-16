import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome To Your Smart Home', color: '#03A9F4'},
    { text: 'Check & Control Smart Home Status', color: '#009688'},
    { text: 'Enjoy Smartness Of Your Home :)', color: '#03A9F4'}
];

class WelcomeScreen extends Component {

   // state = { token : null };

    // async componentWillMount(){
    //     let token = await AsyncStorage.getItem('db_token');
    //     if(token){
    //         this.props.navigation.navigate('showStatus');
    //         this.setState({ token });
    //     } else {
    //         this.setState({ token : false })
    //     }
    // }

    _onSlidesComplete = () => {
        this.props.navigation.navigate('LoginPage');
    }

    render(){
        // if(_.isNull(this.state.token)){
        //     return <AppLoading />;
        // }
        return(
            <Slides data={SLIDE_DATA} onComplete={this._onSlidesComplete} />
        )
    }

}

export default WelcomeScreen;