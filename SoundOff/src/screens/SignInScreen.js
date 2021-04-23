import React, {useContext, useEffect} from 'react'; 
import {Text, StyleSheet} from 'react-native'
import { WebView } from 'react-native-webview';
import {Context as AuthContext} from '../context/AuthContext';

const SignInScreen = ({navigation}) => { 
    const {
        state: {accessToken, refreshToken, permissionRequired},
        login,
        checkWebViewResponse
    } = useContext(AuthContext);

    useEffect(() => {
        login();
    }, []);

    return (
        <>
        { 
        accessToken 
        ? null
        : permissionRequired ? <WebView 
            source={{
                uri: 'http://28cd19499d99.ngrok.io/login'
            }}
            onNavigationStateChange={(state) => {
                checkWebViewResponse(state)
            }}
        /> 
        : null
        }
        </>
    );
}

const styles = StyleSheet.create({})

export default SignInScreen;

/*
REQUIRED STEPS TO GET LOGIN WORKING IN TEST ENV

- Update ngrok URL on this page
- Update ngrok URL in REDIRECT_URI variable on server
- Update redirect URI in spotify app page
- To clear approval, just delete SoundOff from your Spotify Apps
*/