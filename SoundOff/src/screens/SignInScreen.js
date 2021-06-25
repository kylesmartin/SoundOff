import React, {useContext, useEffect} from 'react'; 
import {Text, StyleSheet} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';

const SignInScreen = ({navigation}) => { 
    // Initialize context
    const {
        signin
    } = useContext(AuthContext);

    // Sign in immediately (and once)
    useEffect(() => {
        signin("test@test.com", "mypassword");
    }, []);

    return (
        <>
        </>
    );
};

const styles = StyleSheet.create({});

export default SignInScreen;