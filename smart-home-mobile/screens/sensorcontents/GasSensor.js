import React from 'react';
import { Text } from 'react-native';

const GasContent = props =>{

    let { gasStatus } = this.props;
    
    return(
        <Text>
            { gasStatus }
        </Text>
    )
}

export default GasContent;