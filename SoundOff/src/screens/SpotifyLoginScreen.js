import React, {useContext, useEffect} from 'react'; 
import {Text, StyleSheet} from 'react-native';
import { WebView } from 'react-native-webview';
import {Context as AuthContext} from '../context/AuthContext';
import {SERVER_URL} from '../config';

const SpotifyLoginScreen = ({navigation}) => {
    // Initialize context
    const {
        state: {accessToken, permissionRequired},
        loginToSpotify,
        checkWebViewResponse
    } = useContext(AuthContext);
    
    // Immediately log into Spotify with user token
    useEffect(() => {
        loginToSpotify();
    }, []);

    return (
        <>
        { 
        accessToken 
        ? null
        : permissionRequired ? <WebView 
            source={{
                uri: SERVER_URL+'/spotifylogin'
            }}
            onNavigationStateChange={(state) => {
                checkWebViewResponse(state)
            }}
        /> 
        : null
        }
        </>
    );
};

const styles = StyleSheet.create({});

export default SpotifyLoginScreen;
