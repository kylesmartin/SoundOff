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
      
        // Srujan's: test@test.com, mypassword
        // Kyle's: kyle@gmail.com, pass
        signin("kyle@gmail.com", "pass");

    }, []);

    return (
        <>
        </>
    );
};

const styles = StyleSheet.create({});


export default SignInScreen;
