import { useEffect, useState, useContext } from 'react';
import {search} from '../api/spotify';
import {Context as AuthContext} from '../context/AuthContext'

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { state: { accessToken } } = useContext(AuthContext);

  const searchApi = async (searchTerm) => {
    try {
      const response = await search(searchTerm, accessToken)
      setResults(response.tracks);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    searchApi('Srujans Sound');
  }, []);

  return [searchApi, results, errorMessage];
};