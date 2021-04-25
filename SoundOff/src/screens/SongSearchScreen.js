import React, {useState} from 'react'; 
import {Text, View, StyleSheet, FlatList} from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import Spacer from '../components/Spacer';

const SongSearchScreen = ({navigation}) => { 

    const [term, setTerm] = useState('');
    const [searchApi, results, errorMessage] = useResults();

    console.log(results);

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
                        <Text>{item.name}</Text>
                    );
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({})

export default SongSearchScreen;