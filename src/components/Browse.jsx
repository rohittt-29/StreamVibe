
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import usenowPlayingMovies from '../Hooks/usenowPlayingMovies'
import usePopularMovie from '../Hooks/usePopularMovie';
import useTopRated from '../Hooks/useTopRated';
import useUpComing from '../Hooks/useUpComing';
import { testTMDBAPI, testNetworkConnectivity } from '../utils/apiTest';
import GptSearch from './GptSearch';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import DebugInfo from './DebugInfo';
import TestAPI from './TestAPI';

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const movies = useSelector((store) => store.movies);

  // Test API connectivity on component mount
  useEffect(() => {
    console.log('🎬 StreamVibe Browse component mounted');
    console.log('📊 Initial Redux State:', {
      nowPlaying: movies?.nowPlayingMovie?.length || 0,
      popular: movies?.PopularMovie?.length || 0,
      topRated: movies?.TopRated?.length || 0,
      upcoming: movies?.UpComing?.length || 0,
      loading: movies?.loading,
      errors: movies?.errors
    });
    
    // Run connectivity tests
    const runTests = async () => {
      await testNetworkConnectivity();
      await testTMDBAPI();
    };
    
    runTests();
  }, []);

  // Call all hooks directly - they have their own error handling and retry logic
  usenowPlayingMovies();
  usePopularMovie();
  useTopRated();
  useUpComing();

  return (
    <div>
      <Header />
      <DebugInfo />
      <TestAPI />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
