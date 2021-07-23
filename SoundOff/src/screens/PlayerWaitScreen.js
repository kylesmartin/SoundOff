import React, {useEffect, useContext, useCallback} from 'react'; 
import {Text, View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as SocketContext } from '../context/SocketContext';
import { Context as GameContext } from '../context/GameContext';

const PlayerWaitScreen = ({navigation}) => {

    const {
        state: {socket},
    } = useContext(SocketContext);

    // Navigates to song search screen
    const handleRoundStart = useCallback((msg) => {
        navigation.navigate('SongSearch', { category: msg.category })
    }, []);

    useEffect(() => {
        socket.on('roundStarted', handleRoundStart);
        return () => {
            // Before the component is destroyed
            // Unbind all event handlers used in this component
            socket.off('roundStarted', handleRoundStart);
        };
    }, []);

    return (
        <View>
            <Text>Wait for judge to create category...</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default PlayerWaitScreen;