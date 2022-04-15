const GroupMovies = (allMovies) => {
  const array = allMovies.reduce((genre, movie) => {
    const {
      genres,
      id,
      movie_id,
      image,
      release_date,
      tagline,
      overview,
      title,
      is_favorite,
      my_comment,
    } = movie;

    genre[genres] = [
      ...(genre[genres] || []),
      {
        genres,
        id,
        movie_id,
        image,
        release_date,
        tagline,
        overview,
        title,
        is_favorite,
        my_comment,
      },
    ];
    return genre;
  }, {});
  return array;
};

export default GroupMovies;
