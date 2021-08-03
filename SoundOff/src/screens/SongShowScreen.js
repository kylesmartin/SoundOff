import React, {useContext, useState, useEffect} from 'react'; 
import {Text, View, StyleSheet, FlatList} from 'react-native';
import Spacer from '../components/Spacer';
import { searchById } from '../api/spotify';
import {Context as AuthContext} from '../context/AuthContext';
import SongDisplay from '../components/SongDisplay';
import { Context as SocketContext } from '../context/SocketContext';
import { Context as GameContext } from '../context/GameContext';

const SongShowScreen = ({navigation}) => {
    /**
    * Searches Spotify for song by id
    * @param id the track id
    */
    const searchByIdApi = async (id) => {
        try {
            const response = await searchById(id, accessToken);
            return response;
        } catch (err) {
            console.log(err)
            setErrorMessage('Something went wrong');
        }
    };

    const effectFunction = async () => {
        const allSongIds = navigation.getParam('songs');
        var allSongs = [];
        for (let i = 0; i < allSongIds.length; i++) {
            const song = await searchByIdApi(allSongIds[i]);
            allSongs.push(song);
        }
        setResults(allSongs);
    }

    const {
        state: {socket}
    } = useContext(SocketContext);

    const {
        state: {gameId, socketId}
    } = useContext(GameContext);

    const { state: { accessToken } } = useContext(AuthContext);
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        effectFunction();
    }, []);

    return (
        <View>
            <Spacer/>
            <FlatList
                vertical
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={results}
                keyExtractor={result => result.id}
                renderItem={({ item }) => {
                    console.log(item)
                    return (
                        <SongDisplay track={item} pressFn={() => {
                            if (navigation.getParam('type') == 'Judge') {
                                socket.emit('winnerSelected', {gameId, socketId, songId: item.id})
                                // TODO: navigate somewhere
                            }
                        }}/>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default SongShowScreen;