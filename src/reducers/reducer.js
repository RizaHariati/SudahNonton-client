import {
  ADD_LIST,
  DELETE_LIST_ITEM,
  GET_BOTTOM_SHEET_CONTENT,
  GET_LATEST_SEARCHED,
  GET_MOVIE,
  GET_TVSHOW,
  LOADING,
  LOGIN,
  LOGOUT,
  SET_BOTTOM_SHEET_INDEX,
  SET_FAVORITES,
  SET_MOVIES,
  SET_SEARCH,
  SET_TVSHOWS,
  WATCHLIST,
} from "../context";
import StoreWatchList from "../utils/StoreWatchList";

const reducer = (state = initialState, { type, payload }) => {
  if (type === LOADING) {
    return { ...state, loading: true };
  }
  if (type === LOGIN) {
    return { ...state, isLogin: true, token: payload };
  }

  if (type === LOGOUT) {
    return { ...state, isLogin: false, token: null, loading: false };
  }

  if (type === SET_MOVIES) {
    return {
      ...state,
      gettingData: false,
      allMovies: payload.allMovies,
      movies: payload.movies,
      loading: false,
    };
  }

  if (type === SET_TVSHOWS) {
    return {
      ...state,
      gettingData: false,
      allTvShows: payload.allTvShows,
      tvshows: payload.tvshows,
      loading: false,
    };
  }

  if (type === SET_FAVORITES) {
    const allTvShows = payload.allTvShows;
    const allMovies = payload.allMovies;

    const tvshowsFave = allTvShows.filter((item) => item.is_favorite === 1);
    const moviesFave = allMovies.filter((item) => item.is_favorite === 1);

    const array = tvshowsFave.concat(moviesFave);
    const sortArray = array?.sort((a, b) =>
      a.created_at > b.created_at ? -1 : 1
    );

    const array2 = allTvShows.concat(allMovies);
    const getallShows = array2?.sort((a, b) =>
      a.created_at > b.created_at ? -1 : 1
    );

    const groupArray = sortArray.reduce((genre, show) => {
      if ("movie_id" in show) {
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
        } = show;

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
      } else {
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
        } = show;

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
          },
        ];
      }
      return genre;
    }, {});

    return {
      ...state,
      allFavorites: sortArray,
      favorites: Object.entries(groupArray),
      allShows: getallShows,
      loading: false,
    };
  }

  if (type === GET_LATEST_SEARCHED) {
    const numberMovies = [2, 12, 56, 79, 145];
    const numberTvShows = [9, 22, 45, 56, 121];
    let movies = [];
    let tvshows = [];
    numberMovies.forEach((item) => {
      const movie = state.allMovies.filter((data) => data.id === item);
      movies.push(movie[0]);
    });
    numberTvShows.forEach((item) => {
      const tvshow = state.allTvShows.filter((data) => data.id === item);
      tvshows.push(tvshow[0]);
    });
    const shows = movies.concat(tvshows);
    const sortedShows = shows?.sort((a, b) =>
      a.created_at > b.created_at ? -1 : 1
    );
    return {
      ...state,
      latestSearched: sortedShows,
      loading: false,
    };
  }

  if (type === GET_BOTTOM_SHEET_CONTENT) {
    return {
      ...state,
      bottomSheetIndex: payload.index,
      bottomSheetContent: payload.item,
    };
  }

  if (type === SET_BOTTOM_SHEET_INDEX) {
    return {
      ...state,
      bottomSheetIndex: payload,
    };
  }

  if (type === GET_MOVIE) {
    return {
      ...state,
      loading: false,
      singleShow: payload,
    };
  }

  if (type === GET_TVSHOW) {
    return {
      ...state,
      loading: false,
      singleShow: payload,
    };
  }

  if (type === SET_SEARCH) {
    let getSearch;
    const find = state.latestSearched.find((item) => {
      const result =
        "movie_id" in item
          ? item.movie_id === payload.movie_id
          : item.tv_id === payload.tv_id;
      return result;
    });

    if (find) {
      return {
        ...state,
      };
    } else {
      if ("movie_id" in payload) {
        getSearch = state.allMovies.find(
          (item) => item.movie_id === payload.movie_id
        );
      } else {
        getSearch = state.allTvShows.find(
          (item) => item.tv_id === payload.tv_id
        );
      }
      const latest = state.latestSearched.slice(1);
      latest.push(getSearch);
      return {
        ...state,
        latestSearched: latest,
      };
    }
  }

  if (type === ADD_LIST) {
    let shows = state.watchList ? state.watchList : [];
    let show;

    if ("movie_id" in payload) {
      show = state.allMovies.find((item) => item.movie_id === payload.movie_id);
    } else {
      show = state.allTvShows.find((item) => item.tv_id === payload.tv_id);
    }
    shows.push(show);
    StoreWatchList(shows);
    return {
      ...state,
      watchList: shows,
    };
  }

  if (type === WATCHLIST) {
    return {
      ...state,
      watchList: payload,
    };
  }
  if (type === DELETE_LIST_ITEM) {
    const watchList = state.watchList;

    const filterList = watchList.filter((item) => {
      if ("movie_id" in payload) {
        if ("movie_id" in item) {
          return item.movie_id !== payload.movie_id;
        } else {
          return item;
        }
      } else {
        if ("tv_id" in payload) {
          return item.tv_id !== payload.tv_id;
        } else {
          return item;
        }
      }
    });
    StoreWatchList(filterList);
    return {
      ...state,
      watchList: filterList,
    };
  }

  return state;
};

export default reducer;
