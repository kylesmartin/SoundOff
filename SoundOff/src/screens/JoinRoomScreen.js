import React, {useEffect, useContext, useCallback} from 'react'; 
import {Text, View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as SocketContext } from '../context/SocketContext';
import { Context as GameContext } from '../context/GameContext';

const JoinRoomScreen = ({navigation}) => { 

    // State to keep track of user key input
    const {
        state: {gameId, socketId},
        setSocketId,
        setGameId
    } = useContext(GameContext);
    
    // Initialize socket context 
    const {
        state: {socket},
    } = useContext(SocketContext);

    // Navigates to song search screen
    const handleGameStart = useCallback((msg) => {
        navigation.navigate('Wait', {type: 'Player', msg: 'Wait for judge to create category...'})
    }, []);

    const handleJoinGame = useCallback((response) => {
        setGameId(response.gameId)
        setSocketId(response.mySocketId)
    }, []);

    useEffect(() => {
        socket.on('gameStarted', handleGameStart);
        socket.on('playerJoinedRoom', handleJoinGame);
        return () => {
            // Before the component is destroyed
            // Unbind all event handlers used in this component
            socket.off('gameStarted', handleGameStart);
            socket.off('playerJoinedRoom', handleJoinGame);
        };
    }, []);

    const joinGame = (myGameId) => {
        // Set player data to send to server
        const data = {playerName: 'Srujan', gameId: myGameId};
        // Emit player join game event
        socket.emit('playerJoinGame', data);
    };

    return (
        <View style = {{marginTop : 100}}>
            <Spacer/>
            <Input 
                label="Game Id" 
                value={gameId == null ? gameId : gameId.toString()}
                onChangeText={setGameId}
                autoCapitalize = "none"
                autoCorrect = {false}
            />
            <Spacer/>
            <Button 
                title="Join!"
                onPress={() => joinGame(gameId)}
            />
            <Spacer/>
            <Text>Your Game ID is: {gameId}</Text>
            <Text>The Socket ID is: {socketId}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default JoinRoomScreen;