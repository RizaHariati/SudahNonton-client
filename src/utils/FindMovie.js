const FindMovie = (id, allMovies) => {
  const item = allMovies.filter((movie) => {
    return movie.movie_id === id;
  });

  if (item.length < 1) {
    return false;
  } else {
    return true;
  }
};

export default FindMovie;
