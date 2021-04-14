import React from 'react'; 
import {Text, View, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
import Spacer from '../components/Spacer' 

const MenuScreen = ({navigation}) => { 
    
    return (
        <View>
            <Text style={styles.header} h2>Main Menu</Text> 
            
            <View>
                <Spacer/>
                <Button 
                    title="Create a Room!"
                    containerStyle={{ marginVertical: 20 }}
                    onPress={() => navigation.navigate('CreateRoom')}
                />
                <Button 
                    title="Join a Room!"
                    onPress={() => navigation.navigate('JoinRoom')}
                />
                <Spacer/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        marginTop: 100,
        fontSize: 30,
        justifyContent: "center",
        textAlign: 'center'
    }

})

export default MenuScreen;