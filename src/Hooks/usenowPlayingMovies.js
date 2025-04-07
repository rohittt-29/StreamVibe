import { useDispatch } from "react-redux";
import { addnowPlayingMovie } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";


const usenowPlayingMovies =() =>{
    const dispatch = useDispatch();

  const getMovies = async() =>{
    const data =  await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', API_OPTIONS);
   const json = await data.json();
   console.log(json.results);
   dispatch(addnowPlayingMovie(json.results))
  };

  useEffect(()=>{
    getMovies();
  },[])
}

export default usenowPlayingMovies;