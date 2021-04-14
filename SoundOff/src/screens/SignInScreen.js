import React from 'react'; 
import {Text, View, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'

const SignInScreen = ({navigation}) => { 
    
    return (
        <View>
            <Text style={styles.header} h2>SoundOff</Text> 
            <Button 
                title="Login to Spotify"
                containerStyle={{ marginVertical: 100 }}
                onPress={() => navigation.navigate('Menu')}
            />
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        marginTop: 250,
        fontSize: 40,
        justifyContent: "center",
        textAlign: 'center'
    }
})

export default SignInScreen;