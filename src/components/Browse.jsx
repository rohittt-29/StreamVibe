
import usenowPlayingMovies from '../Hooks/usenowPlayingMovies'
import usePopularMovie from '../Hooks/usePopularMovie';
import useTopRated from '../Hooks/useTopRated';
import useUpComing from '../Hooks/useUpComing';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';




const Browse = () => {

  usenowPlayingMovies();
  usePopularMovie();
  useTopRated();
  useUpComing();
  
  
  return (
    <div>
      <Header/>
      <MainContainer/>
      <SecondaryContainer/>
    </div>
  )
}

export default Browse
