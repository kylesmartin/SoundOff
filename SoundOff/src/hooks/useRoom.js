import {useState } from 'react';
import {roomGet, roomPost} from '../api/gamestate';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  const roomApi = async (query, roomID, randomKey) => {

    if (query === '/get') {
        
        try {
            const response = await roomGet(roomID, randomKey)
            setResults(response);
          } catch (err) {
            setErrorMessage('Something went wrong');
          }

    }
    
    else if (query === '/post') {

        try {
            const response = await roomPost(roomID, randomKey)
            setResults(response);
          } catch (err) {
            setErrorMessage('Something went wrong');
          }

    }

  }
    
  return [roomApi, results, errorMessage];

};