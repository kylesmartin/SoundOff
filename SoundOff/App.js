import React from 'react'; 

import { 
  createAppContainer,
  createSwitchNavigator
} from 'react-navigation';

import { createStackNavigator } from 'react-navigation-stack';

// Screens
import PlayerWaitScreen from './src/screens/PlayerWaitScreen';
import CategorySelectScreen from './src/screens/CategorySelectScreen';
import CountDownScreen from './src/screens/CountDownScreen';
import JudgeWaitScreen from './src/screens/JudgeWaitScreen';
import SongSearchScreen from './src/screens/SongSearchScreen';
import JudgeReviewScreen from './src/screens/JudgeReviewScreen';
import SongShowScreen from './src/screens/SongShowScreen';
import VotingScreen from './src/screens/VotingScreen';
import GameStateScreen from './src/screens/GameStateScreen';
import MenuScreen from './src/screens/MenuScreen';
import CreateRoomScreen from './src/screens/CreateRoomScreen';
import JoinRoomScreen from './src/screens/JoinRoomScreen';
import SignInScreen from './src/screens/SignInScreen';

const switchNavigator = createSwitchNavigator({
  
  // Setting default screen as Sign in screen
  Signin: SignInScreen,
  
  loginFlow: createSwitchNavigator({
    Signin: SignInScreen,

    menuFlow: createStackNavigator({
      Menu: MenuScreen,
      CreateRoom: CreateRoomScreen,
      JoinRoom: JoinRoomScreen
    })

  }),

  mainFlow: createSwitchNavigator({
    PlayerWait: PlayerWaitScreen,
    CategorySelect: CategorySelectScreen,
    CountDown: CountDownScreen, 
    JudgeWait: JudgeWaitScreen, 
    SongSearch: SongSearchScreen, 
    JudgeReview: JudgeReviewScreen,
    SongShow: SongShowScreen,
    Voting: VotingScreen,
    GameState: GameStateScreen
  })

}); 

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <App/>
  );
};
