
import { useSelector } from 'react-redux';
import usenowPlayingMovies from '../Hooks/usenowPlayingMovies'
import usePopularMovie from '../Hooks/usePopularMovie';
import useTopRated from '../Hooks/useTopRated';
import useUpComing from '../Hooks/useUpComing';
import useStaggeredLoading from '../Hooks/useStaggeredLoading';
import GptSearch from './GptSearch';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';

const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  // Use staggered loading for better mobile performance
  useStaggeredLoading([
    () => usenowPlayingMovies(),
    () => usePopularMovie(),
    () => useTopRated(),
    () => useUpComing()
  ], [0, 300, 600, 900]); // Stagger by 300ms each

  return (
    <div>
      <Header />
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
