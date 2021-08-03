import React, {useEffect, useContext, useCallback} from 'react'; 
import {View, StyleSheet} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as SocketContext } from '../context/SocketContext';
import { Context as GameContext } from '../context/GameContext';

const WaitScreen = ({navigation}) => {

    const {
        state: {socket},
    } = useContext(SocketContext);

    // Navigates to song search screen
    const handleRoundStart = useCallback((msg) => {
        if (navigation.getParam('type') == 'Player') {
            navigation.navigate('SongSearch', { category: msg.category })
        }
    }, []);

    const handleAllSongsSubmitted = useCallback((msg) => {
        navigation.navigate('SongShow', { songs: msg.songs, type: navigation.getParam('type') })
    })

    useEffect(() => {
        socket.on('roundStarted', handleRoundStart);
        socket.on('allSongsSubmitted', handleAllSongsSubmitted);
        return () => {
            // Before the component is destroyed
            // Unbind all event handlers used in this component
            socket.off('roundStarted', handleRoundStart);
            socket.off('allSongsSubmitted', handleAllSongsSubmitted);
        };
    }, []);

    return (
        <View>
            <Text>{navigation.getParam('msg')}</Text>
        </View>
    );
};

const styles = StyleSheet.create({});

export default WaitScreen;