import React from 'react';
import { Text } from 'react-native';

const GarageContent = props =>{
    
    let { garageStatus, handleGarageButton } = this.props;
    
    return(
        <Text>
            { garageStatus }
        </Text>
    )
}

export default GarageContent;