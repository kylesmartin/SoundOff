import {useState, useContext} from 'react';
import {roomGet, roomPost} from '../api/gamestate';
import {Context as AuthContext} from '../context/AuthContext';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const {
    state: {userToken}
  } = useContext(AuthContext);
  
  const roomApi = async (query, roomID, randomKey) => {

    if (query === '/get') {
        
        try {
            const response = await roomGet(roomID, randomKey, userToken)
            setResults(response);
          } catch (err) {
            setErrorMessage('Something went wrong');
          }

    }
    
    else if (query === '/post') {

        try {
            const response = await roomPost(roomID, randomKey, userToken)
            setResults(response);
          } catch (err) {
            setErrorMessage('Something went wrong');
          }

    }

  }
    
  return [roomApi, results, errorMessage];

};