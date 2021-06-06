import { useEffect, useState, useContext } from 'react';
import {search} from '../api/spotify';
import {Context as AuthContext} from '../context/AuthContext';

/**
 * Hook for searching songs
 */
export default () => {
  // Initialize state and context
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { state: { accessToken } } = useContext(AuthContext);

  /**
   * Searches Spotify for songs
   * @param searchTerm User-inputted query
   */
  const searchApi = async (searchTerm) => {
    try {
      const response = await search(searchTerm, accessToken);
      setResults(response.tracks);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  // Initialize search to Srujan's Sound
  useEffect(() => {
    searchApi('Srujans Sound');
  }, []);

  return [searchApi, results, errorMessage];
};