const FindTvShow = (id, allTvShows) => {
  const item = allTvShows.filter((tvshows) => {
    return tvshows.tv_id === id;
  });

  if (item.length < 1) {
    return false;
  } else {
    return true;
  }
};

export default FindTvShow;
