import React from 'react'; 
import {View, StyleSheet} from 'react-native';

/**
 * Component that adds spacing around child components
 * @param children The child components to be spaced
 */ 
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


