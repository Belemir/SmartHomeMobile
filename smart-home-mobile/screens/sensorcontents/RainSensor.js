import React from 'react';
import { Text } from 'react-native';

const RainSensor = props =>{

    let { rainStatus } = this.props;

    return(
        <Text>
            { rainStatus }
        </Text>
    )
}

export default RainSensor;