import React from 'react'; 
import {View, StyleSheet} from 'react-native';

// SPacer component to help with element spacing in app. 
const Spacer = ({children}) => {
    
    return (
        <View style={styles.spacer}>{children}</View>
    );
};

const styles = StyleSheet.create({
    spacer: {
        margin: 30
    }
}); 

export default Spacer; 


