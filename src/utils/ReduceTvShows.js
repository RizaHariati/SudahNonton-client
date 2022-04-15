const GroupTvShows = (allTvShows) => {
  const array = allTvShows.reduce((genre, tvshows) => {
    const {
      genres,
      id,
      tv_id,
      image,
      number_of_seasons,
      tagline,
      overview,
      name,
      is_favorite,
      my_comment,
    } = tvshows;

    genre[genres] = [
      ...(genre[genres] || []),
      {
        genres,
        id,
        tv_id,
        image,
        number_of_seasons,
        tagline,
        overview,
        name,
        is_favorite,
        my_comment,
      },
    ];
    return genre;
  }, {});
  return array;
};

export default GroupTvShows;
