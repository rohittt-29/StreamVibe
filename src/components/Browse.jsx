
import { useSelector } from 'react-redux';
import usenowPlayingMovies from '../Hooks/usenowPlayingMovies'
import usePopularMovie from '../Hooks/usePopularMovie';
import useTopRated from '../Hooks/useTopRated';
import useUpComing from '../Hooks/useUpComing';
import GptSearch from './GptSearch';
import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';




const Browse = () => {
   
  const showGptSearch =useSelector((store)=> store.gpt.showGptSearch)

  usenowPlayingMovies();
  usePopularMovie();
  useTopRated();
  useUpComing();
  
  
  return (
    <div>
      <Header/>
      {
        showGptSearch ? <GptSearch/> :
         <>
        
      <MainContainer/>
      <SecondaryContainer/>

        </>
      }
    
   
    </div>
  )
}

export default Browse
