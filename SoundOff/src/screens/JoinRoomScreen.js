<<<<<<< Updated upstream
import React, {useState} from 'react'; 
import {Text, View, StyleSheet} from 'react-native'
import {Input, Button} from 'react-native-elements'
import Spacer from '../components/Spacer' 
=======
import React, {useState, useContext} from 'react'; 
import {Text, View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as SocketContext } from '../context/SocketContext';
>>>>>>> Stashed changes

const JoinRoomScreen = ({navigation}) => { 
    
    // State to keep track of user key input
    const [roomKey, setRoomKey] = useState('');
    const [socketID, setSocketID] = useState('')

    // Initialize socket context 
    const {
        state: {socket},
    } = useContext(SocketContext);

    // Sets ids when new game is created
    const handleJoinGame = (roomKey) => {
        // Set player data to send to server
        const data = {playerName: 'Srujan', gameId: roomKey};
        // Emit player join game event
        socket.emit('playerJoinGame', data);
        // On receiving the joined response, navigate to menu.
        socket.on('playerJoinedRoom', (response) => {
        setSocketID(response.mySocketId)    
        });

    };

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
<<<<<<< Updated upstream
                    title="Join!"
                    onPress={() => navigation.navigate('Menu')}
=======
                title="Join!"
                onPress={() => handleJoinGame(roomKey)}
>>>>>>> Stashed changes
            />
            <Spacer/>

            <Text>Your room key is: {roomKey}</Text>
            <Text>The socket ID key is: {socketID}</Text>
        </View>
    )
}

const styles = StyleSheet.create({

})

export default JoinRoomScreen;