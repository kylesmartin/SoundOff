import React, {useState} from 'react'; 
import {Text, View, StyleSheet} from 'react-native'
import {Input, Button} from 'react-native-elements'
import Spacer from '../components/Spacer' 

const JoinRoomScreen = ({navigation}) => { 
    
    // State to keep track of user key input
    const [roomKey, setRoomKey] = useState('');

    return (
        <View style = {{marginTop : 100}}>
            <Spacer/>
            <Input 
                label="Room Key" 
                value={roomKey}
                onChangeText={setRoomKey}
                autoCapitalize = "none"
                autoCorrect = {false}
            />
            <Spacer/>
            <Button 
                    title="Join!"
                    onPress={() => navigation.navigate('Menu')}
            />
            <Spacer/>

            <Text>Your room key is: {roomKey}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default JoinRoomScreen;