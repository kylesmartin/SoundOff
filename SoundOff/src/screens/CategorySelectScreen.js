import React, { useState, useContext } from 'react'; 
import {Text, View, StyleSheet} from 'react-native';
import {Input, Button} from 'react-native-elements';
import Spacer from '../components/Spacer';
import { Context as SocketContext } from '../context/SocketContext';
import { Context as GameContext } from '../context/GameContext';

const CategorySelectScreen = ({navigation}) => { 

    const [category, setCategory] = useState('')

    const {
        state: {socket},
    } = useContext(SocketContext);

    const {
        state: {socketId, gameId}
    } = useContext(GameContext);

    const submitCategory = (category) => {
        socket.emit('categorySubmitted', {category, socketId, gameId})
        navigation.navigate('JudgeWait');
    };

    return (
        <View>
            <Spacer/>
            <Input 
                label="Enter your category" 
                value={category}
                onChangeText={setCategory}
                autoCapitalize = "none"
                autoCorrect = {false}
            />
            <Spacer/>
            <Button 
                title="Submit"
                onPress={() => submitCategory(category)}
            />
            <Spacer/>
        </View>
    );
};

const styles = StyleSheet.create({});

export default CategorySelectScreen;