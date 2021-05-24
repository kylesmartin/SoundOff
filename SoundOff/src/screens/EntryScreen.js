import React, {useContext, useEffect} from 'react'; 
import {Text, StyleSheet} from 'react-native'
import {Context as AuthContext} from '../context/AuthContext';

const EntryScreen = ({navigation}) => { 
    const {
        signin
    } = useContext(AuthContext);

    useEffect(() => {
        signin();
    }, []);

    return (
        <>
        </>
    );
}

const styles = StyleSheet.create({})

export default EntryScreen;