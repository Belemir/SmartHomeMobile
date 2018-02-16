import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements'; 

class AssistantScreen extends Component{

    render(){
        return(
            <View>
                <Card
                    title='ASSISTANT'
                    image={require('../assets/icons/temperature/housetemp.png')}
                >
                    <Text style={{marginBottom: 10}}>
                        Heat and Humidity Info: 46 Celsius / 25 % humidity
                    </Text>

                    <Button
                        icon={{name: 'code'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Switch off Sensor' 
                    />
                </Card>

                <Card
                title='ASSISTANT'
                image={require('../assets/icons/temperature/housetemp.png')}
                >
                <Text style={{marginBottom: 10}}>
                    Heat and Humidity Info: 46 Celsius / 25 % humidity
                </Text>

                <Button
                    icon={{name: 'code'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Switch off Sensor' 
                />
                </Card>

                <Card
                title='ASSISTANT'
                image={require('../assets/icons/temperature/housetemp.png')}
                >
                <Text style={{marginBottom: 10}}>
                    Heat and Humidity Info: 46 Celsius / 25 % humidity
                </Text>

                <Button
                    icon={{name: 'code'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Switch off Sensor' 
                />
                </Card>

                <Card
                title='ASSISTANT'
                image={require('../assets/icons/temperature/housetemp.png')}
                >
                <Text style={{marginBottom: 10}}>
                    Heat and Humidity Info: 46 Celsius / 25 % humidity
                </Text>

                <Button
                    icon={{name: 'code'}}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Switch off Sensor' 
                />
                </Card>
            </View>
        )
    }
}

export default AssistantScreen;