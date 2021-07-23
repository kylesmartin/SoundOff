import React, { useContext, useCallback } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { Context as SocketContext } from '../context/SocketContext';
import { Context as GameContext } from '../context/GameContext';

/**
 * Component that displays song search results
 * @param track Contains the track to be displayed
 */
const SongDisplay = ({ track }) => {

    const {
        state: {socket},
    } = useContext(SocketContext);

    const {
        state: {gameId, socketId},
        setGameId,
        setSocketId
    } = useContext(GameContext);

    return (<>
        <TouchableOpacity onPress={() => { console.log(track) }}>
            <View style={styles.container}>
                <Image style={styles.image} source={{ uri: track.album.images[0].url }} />
                <Text>{track.name}</Text>
            </View>
        </TouchableOpacity>
    </>);

};

const styles = StyleSheet.create({
    image: {
        width: 250,
        height: 120,
        borderRadius: 4,
        marginBottom: 5
    },
    container: {
        marginLeft: 30,
        marginRight: 30,
        marginTop: 30,
    }
}); 

export default SongDisplay; 


