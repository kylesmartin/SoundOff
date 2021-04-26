import React from 'react'; 
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import { Audio } from 'expo-av';

const SongDisplay = ({ track }) => {
    console.log(track.preview_url)
    return (
        <>
        {track.preview_url == null
            ? null
            : <TouchableOpacity onPress={async () => {
                url = track.preview_url
                const { sound } = await Audio.Sound.createAsync(
                    { uri: url },
                    { shouldPlay: true }
                );
                await sound.playAsync(); 
            }}>
                <View style={styles.container}>
                    <Image style={styles.image} source={{ uri: track.album.images[0].url }} />
                    <Text>{track.name}</Text>
                </View>
            </TouchableOpacity>
        }
        </>
    );
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


