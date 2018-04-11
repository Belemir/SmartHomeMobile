import React from 'react';
import { Text } from 'react-native';

const MotionSensor = props =>{

    let { motionStatus } = this.props;

    return(
        <Text>
            { motionStatus }
        </Text>
    )
}

export default MotionSensor;