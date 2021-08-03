import React, {useState, useContext} from 'react'; 
import {Text, View, StyleSheet, FlatList} from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import Spacer from '../components/Spacer';
import SongDisplay from '../components/SongDisplay';
import { navigate } from '../navigationRef';
import { Context as SocketContext } from '../context/SocketContext';
import { Context as GameContext } from '../context/GameContext';

const SongSearchScreen = ({navigation}) => { 

    // Initialize state and search api hook
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults();

    const {
        state: {socket},
    } = useContext(SocketContext);

    const {
        state: {gameId, socketId},
    } = useContext(GameContext);

    return (
        <View>
            <Spacer/>
            <Text>{navigation.getParam('category')}</Text>
            <SearchBar
                term={term}
                onTermChange={setTerm}
                onTermSubmit={() => searchApi(term)}
            />
            {errorMessage ? <Text>{errorMessage}</Text> : null}
            <FlatList
                vertical
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                data={results.items}
                keyExtractor={result => result.id}
                renderItem={({ item }) => {
                    return (
                        <SongDisplay track={item} pressFn={() => {
                            socket.emit('songSubmitted', {gameId, socketId, songId: item.id})
                            navigate('Wait', {type: 'Player', msg: 'Waiting for other players to submit songs...'});
                        }}/>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default SongSearchScreen;