import React, {useEffect, useState} from 'react'; 
import {Text, View, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'
import Spacer from '../components/Spacer'
import useRoom from '../hooks/useRoom';

const CreateRoomScreen = ({navigation}) => { 
    
    // State keeps track of randomly generated key
    const [randomKey, setRandomKey] = useState(''); 
    const [roomID, setRandomId] = useState(''); 
    const [roomApi, results, errorMessage] = useRoom();
    
    // useEffect to make sure random key and id is only rendered once upon screen access
    useEffect(() => {
        
        let key = Math.random().toString().substr(2, 6); // Random number key
        setRandomKey(key);
        
        let id = Math.random().toString().substr(2, 6); // Random number key
        setRandomId(id);

    }, []); 

    const [playerNames, setPlayerNames] = useState([])

    useEffect(() => {

        console.log(randomKey)
        console.log(roomID)
        roomApi('/post', roomID, randomKey)

    }, [randomKey,roomID])

    const addPlayerName = useCallback((newPlayerInfo) => {

        setPlayerNames([...playerNames, newPlayerInfo.playerName])
    }, [playerNames]);

    socket.on('playerJoinedRoom', addPlayerName)

    return (
        <View>
            <Text style={styles.header} h2>Room ID is {roomID}</Text> 
            <Text style={styles.roomKey}> Room key is: {randomKey}</Text>
            <Spacer/>
            <Button 
                    title="Begin game"
                    onPress={() => navigation.navigate('Menu')}
            />
            <Text style={styles.header}> {playerNames}</Text>
        </View>
    )  
}
const styles = StyleSheet.create({

    header: {
        marginTop: 100,
        fontSize: 30,
        justifyContent: "center",
        textAlign: 'center'
    },

    roomKey: {
        marginTop: 50,
        fontSize: 20,
        justifyContent: "center",
        textAlign: 'center'
    }
    
})

export default CreateRoomScreen;