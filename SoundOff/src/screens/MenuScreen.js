import React, {useContext, useEffect} from 'react'; 
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';

const MenuScreen = ({navigation}) => { 
    const REFRESH_INTERVAL = 3500000
    
    const {
        state: {refreshToken},
        refreshAccessToken
    } = useContext(AuthContext);

    useEffect(() => {
        setInterval(() => {
            refreshAccessToken(refreshToken)
        }, REFRESH_INTERVAL);
    }, []);

    return (
        <View>
            <Text style={styles.header} h2>Main Menu</Text> 
            
            <View>
                <Spacer/>
                <Button 
                    title="Create a Room!"
                    containerStyle={{ marginVertical: 20 }}
                    onPress={() => navigation.navigate('CreateRoom')}
                />
                <Button 
                    title="Join a Room!"
                    onPress={() => navigation.navigate('JoinRoom')}
                />
                <Spacer/>
                <Button 
                    title="Song Search Demo"
                    onPress={() => navigation.navigate('SongSearch')}
                />
                <Spacer/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    header: {
        marginTop: 100,
        fontSize: 30,
        justifyContent: "center",
        textAlign: 'center'
    }

})

export default MenuScreen;