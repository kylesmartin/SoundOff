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
import SpotifyLoginScreen from './src/screens/SpotifyLoginScreen';
import SignInScreen from './src/screens/SignInScreen';

// Context
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as GameProvider } from './src/context/GameContext';
import { Provider as SocketContext } from './src/context/SocketContext';

// Functions
import { setNavigator } from './src/navigationRef';

// Define navigation
const switchNavigator = createSwitchNavigator({
  loginFlow: createSwitchNavigator({
    Signin: SignInScreen,
    SpotifyLogin: SpotifyLoginScreen,
    menuFlow: createStackNavigator({
      Menu: MenuScreen,
      CreateRoom: CreateRoomScreen,
      JoinRoom: JoinRoomScreen
    },{
      initialRouteName: 'Menu',
      defaultNavigationOptions: {
        title: 'Sound Off'
      }
    })
  },{
    initialRouteName: 'Signin',
    defaultNavigationOptions: {
      title: 'Sound Off'
    }
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
  },{
    initialRouteName: 'PlayerWait',
    defaultNavigationOptions: {
      title: 'Sound Off'
    }
  })
},{
  initialRouteName: 'loginFlow',
  defaultNavigationOptions: {
    title: 'Sound Off'
  }
}); 

// Create app from navigator
const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <SocketContext>
      <GameProvider>
        <AuthProvider>
          <App 
            ref={navigator => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </GameProvider>
    </SocketContext>
  );
};
