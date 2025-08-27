import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Moviecard from './Moviecard';
import TrailerModal from './TrailerModal';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

const Movielist = ({ title, movies, loadingKey, errorKey }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const loading = useSelector(store => store.movies.loading[loadingKey]);
  const error = useSelector(store => store.movies.errors[errorKey]);

  // Debug logging
  console.log(`🎬 Movielist "${title}":`, {
    loading,
    error,
    moviesCount: movies?.length || 0,
    hasMovies: !!movies && movies.length > 0,
    loadingKey,
    errorKey
  });

  if (loading) {
    console.log(`🔄 Showing loading spinner for "${title}"`);
    return (
      <div className="px-5 text-white">
        <h1 className="font-normal md:font-semibold text-xl md:text-3xl py-4">{title}</h1>
        <div className="flex justify-center items-center h-40">
          <LoadingSpinner size="large" color="white" />
        </div>
      </div>
    );
  }

  if (error) {
    console.log(`❌ Showing error for "${title}":`, error);
    return (
      <div className="px-5 text-white">
        <h1 className="font-normal md:font-semibold text-xl md:text-3xl py-4">{title}</h1>
        <ErrorMessage message={error} />
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    console.log(`📭 No movies available for "${title}"`);
    return (
      <div className="px-5 text-white">
        <h1 className="font-normal md:font-semibold text-xl md:text-3xl py-4">{title}</h1>
        <div className="text-center py-8 text-gray-400">
          <p>No movies available</p>
        </div>
      </div>
    );
  }

  console.log(`✅ Rendering ${movies.length} movies for "${title}"`);
  return (
    <div className="px-5 text-white">
      <h1 className="font-normal md:font-semibold text-xl md:text-3xl py-4">{title}</h1>
      <div className="flex overflow-x-scroll hide-scrollbar">
        <div className="flex">
          {movies.map((movie) => (
            <div onClick={() => setSelectedMovie(movie)} key={movie.id}>
              <Moviecard
                posterpath={movie?.poster_path}
                title={movie?.title}
                rating={movie?.vote_average}
              />
            </div>
          ))}
        </div>
      </div>

      {selectedMovie && (
        <TrailerModal movieId={selectedMovie.id} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default Movielist;
