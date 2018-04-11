import React from 'react';
import { Text } from 'react-native';

const HeatSensor = props =>{

let { heatStatus } = this.props;

    return(
        <Text>
            { heatStatus }
        </Text>
    )
}

export default HeatSensor;