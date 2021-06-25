import React, {useEffect, useState, useContext, useCallback} from 'react'; 
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as SocketContext } from '../context/SocketContext';
import { Context as GameContext } from '../context/GameContext';

const CreateRoomScreen = ({navigation}) => { 
    
    // Player names
    const [playerNames, setPlayerNames] = useState([])
    
    // Initialize context
    const {
        state: {socket},
    } = useContext(SocketContext);

    const {
        state: {gameId, socketId},
        setIds
    } = useContext(GameContext);

    // Sets ids when new game is created
    const handleCreateGame = useCallback((msg) => {
        setIds(msg);
    }, []);

    useEffect(() => {
        // Create room
        socket.emit('hostCreateNewGame');
        // Subscribe to socket event
        socket.on('newGameCreated', handleCreateGame);
        socket.on('playerJoinedRoom', addPlayerName)
        return () => {
            // Before the component is destroyed
            // Unbind all event handlers used in this component
            socket.off('newGameCreated', handleCreateGame);
          };
    }, [socket, handleCreateGame, addPlayerName]); 

    const addPlayerName = useCallback((newPlayerInfo) => {
        setPlayerNames([...playerNames, newPlayerInfo.playerName])
    }, [playerNames]);

    return (
        <View>
            <Text style={styles.header} h2>Game ID is {gameId}</Text> 
            <Text style={styles.roomKey}>Socket ID is {socketId}</Text>
            <Spacer/>
            <Button 
                    title="Begin game"
                    onPress={() => handleCreateGame}
            />
            <Text style={styles.header}> {playerNames}</Text>
        </View>
    );
};

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
});

export default CreateRoomScreen;