import React, {useState} from 'react'; 
import {Text, View, StyleSheet, FlatList} from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import Spacer from '../components/Spacer';
import SongDisplay from '../components/SongDisplay';

const SongSearchScreen = ({navigation}) => { 

    // Initialize state and search api hook
    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults();

    return (
        <View>
            <Spacer/>
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
                        <SongDisplay track={item}/>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({});

export default SongSearchScreen;