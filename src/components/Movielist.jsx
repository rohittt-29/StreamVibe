import React, { useState } from 'react';
import Moviecard from './Moviecard';
import TrailerModal from './TrailerModal'; // we’ll create this

const Movielist = ({ title, movies }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (!movies) return;

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
