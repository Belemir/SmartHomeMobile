import React from 'react';
import { Text } from 'react-native';

const LightSensor = props =>{

    let { lightStatus } = this.props;
    
    return(
        <Text>
            { lightStatus }
        </Text>
    )
}

export default LightSensor;