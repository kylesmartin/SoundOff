import React, {useContext, useEffect} from 'react'; 
import {Text, StyleSheet} from 'react-native'
import { WebView } from 'react-native-webview';
import {Context as AuthContext} from '../context/AuthContext';

const SpotifyLoginScreen = ({navigation}) => { 
    const {
        state: {accessToken, permissionRequired, userToken},
        loginToSpotify,
        checkWebViewResponse
    } = useContext(AuthContext);

    useEffect(() => {
        loginToSpotify(userToken);
    }, []);

    return (
        <>
        { 
        accessToken 
        ? null
        : permissionRequired ? <WebView 
            source={{
                uri: 'http://620746f9d54c.ngrok.io/spotifylogin'
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

export default SpotifyLoginScreen;

/*
REQUIRED STEPS TO GET LOGIN WORKING IN TEST ENV

- Update ngrok URL on this page
- Update ngrok URL in REDIRECT_URI variable on server
- Update redirect URI in spotify app page
- To clear approval, just delete SoundOff from your Spotify Apps
*/