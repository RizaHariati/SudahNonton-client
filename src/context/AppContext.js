import axios from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
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
} from ".";

import reducer from "../reducers/reducer";
import GroupMovies from "../utils/ReduceMovies";
import GroupTvShows from "../utils/ReduceTvShows";
import AsyncStorage from "@react-native-async-storage/async-storage";

const urlMovie = "https://sudahnonton.000webhostapp.com/api/movies/";
const urlTvShow = "https://sudahnonton.000webhostapp.com/api/tvshows/";

const AppContext = createContext();
const dataWatchList = async () => {
  try {
    const savedWishList = await AsyncStorage.getItem("sudahnonton_watchList");
    const response = savedWishList != null ? JSON.parse(savedWishList) : null;

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
const AppProvider = ({ children }) => {
  const initialState = {
    getList: false,
    isLogin: false,
    token: null,
    loading: false,
    allMovies: null,
    allTvShows: null,
    allFavorites: null,
    allShows: null,
    movies: null,
    tvshows: null,
    favorites: null,
    bottomSheetIndex: -1,
    bottomSheetContent: null,
    singleShow: null,
    latestSearched: null,
    watchList: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [loadingAllShows, setLoadingAllShows] = useState(false);
  const [loadingMovies, setLoadingMovies] = useState(false);
  const [loadingTvShows, setLoadingTvShows] = useState(false);

  /* ------------------ LOADING ALL SHOWS FUNCTIONS ----------------- */
  const getLoadingAllShows = () => {
    return setLoadingAllShows(true);
  };

  useEffect(() => {
    let isMounted = true;
    dispatch({ type: LOADING });
    const fetchData = async () => {
      try {
        const resMovie = await fetch(urlMovie + "?page=0");
        const data1 = await resMovie.json();

        const resTvShow = await fetch(urlTvShow + "?page=0");
        const data2 = await resTvShow.json();

        if (data1 && data2) {
          const allMovies = data1.movies;
          const allTvShows = data2.tvshows;
          const groupMovies = GroupMovies(allMovies);
          const groupTvShows = GroupTvShows(allTvShows);
          const allFavorites = {
            allMovies: await allMovies,
            allTvShows: await allTvShows,
          };
          dispatch({
            type: SET_MOVIES,
            payload: { allMovies, movies: Object.entries(groupMovies) },
          });
          dispatch({
            type: SET_TVSHOWS,
            payload: { allTvShows, tvshows: Object.entries(groupTvShows) },
          });

          dispatch({
            type: SET_FAVORITES,
            payload: {
              allMovies: allFavorites.allMovies,
              allTvShows: allFavorites.allTvShows,
            },
          });
          dispatch({
            type: GET_LATEST_SEARCHED,
            payload: {
              allMovies: allFavorites.allMovies,
              allTvShows: allFavorites.allTvShows,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (loadingAllShows) {
      if (isMounted) {
        fetchData();
      }
    }

    return () => {
      setLoadingAllShows(false);
      isMounted = false;
    };
  }, [loadingAllShows]);

  /* ---------------- END LOADING ALL SHOWS FUNCTIONS --------------- */

  /* ------------------ LOADING MOVIES AND TV SHOWS ----------------- */

  const getLoadingMovies = () => {
    return setLoadingMovies(true);
  };

  const getLoadingTvshows = () => {
    return setLoadingTvShows(true);
  };

  useEffect(() => {
    let isMounted = true;
    dispatch({ type: LOADING });
    const fetchMovies = async () => {
      try {
        const resMovie = await fetch(urlMovie);
        const data = await resMovie.json();

        if (data) {
          const allMovies = data.movies;

          const groupMovies = GroupMovies(allMovies);
          const allFavorites = {
            allMovies: await allMovies,
            allTvShows: state.allTvShows,
          };
          dispatch({
            type: SET_MOVIES,
            payload: { allMovies, movies: Object.entries(groupMovies) },
          });
          dispatch({
            type: SET_FAVORITES,
            payload: {
              allMovies: allFavorites.allMovies,
              allTvShows: allFavorites.allTvShows,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (loadingMovies) {
      if (isMounted) {
        fetchMovies();
      }
    }
    return () => {
      setLoadingMovies(false);
      isMounted = false;
    };
  }, [loadingMovies]);

  useEffect(() => {
    let isMounted = true;
    dispatch({ type: LOADING });
    const fetchTvShows = async () => {
      try {
        const resTvShow = await fetch(urlTvShow);
        const data = await resTvShow.json();

        if (data) {
          const allTvShows = data.tvshows;

          const groupTvShows = GroupTvShows(allTvShows);
          const allFavorites = {
            allMovies: state.allMovies,
            allTvShows: await allTvShows,
          };
          dispatch({
            type: SET_TVSHOWS,
            payload: { allTvShows, tvshows: Object.entries(groupTvShows) },
          });

          dispatch({
            type: SET_FAVORITES,
            payload: {
              allMovies: allFavorites.allMovies,
              allTvShows: allFavorites.allTvShows,
            },
          });
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (loadingTvShows) {
      if (isMounted) {
        fetchTvShows();
      }
    }
    return () => {
      setLoadingTvShows(false);
      isMounted = false;
    };
  }, [loadingTvShows]);

  /* ---------------- END LOADING MOVIES AND TVSHOWS ---------------- */

  /* -------------------- BOTTOM SHEET FUNCTIONS -------------------- */
  const getBottomSheetContent = (index, item) => {
    dispatch({ type: GET_BOTTOM_SHEET_CONTENT, payload: { index, item } });
  };

  const setBottomSheetIndex = (index) => {
    dispatch({ type: SET_BOTTOM_SHEET_INDEX, payload: index });
  };

  /* ------------------ END BOTTOM SHEET FUNCTIONS ------------------ */

  const getSingleMovie = useCallback((id) => {
    let isMounted = true;
    dispatch({ type: LOADING });
    if (isMounted) {
      axios
        .get("https://sudahnonton.000webhostapp.com/api/movies/" + id)
        .then((res) => {
          const movie = res.data.movie;

          dispatch({ type: GET_MOVIE, payload: movie });
        })
        .catch((err) => console.log(err));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const getSingleTvShow = useCallback((id) => {
    let isMounted = true;
    dispatch({ type: LOADING });
    if (isMounted) {
      axios
        .get("https://sudahnonton.000webhostapp.com/api/tvshows/" + id)
        .then((res) => {
          const tvshow = res.data.tvshow;

          dispatch({ type: GET_TVSHOW, payload: tvshow });
        })
        .catch((err) => console.log(err));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const setSearch = (search) => {
    dispatch({ type: SET_SEARCH, payload: search });
  };

  /* ---------------------- WATCHLIST FUNCTIONS --------------------- */

  const addList = (item) => {
    dispatch({ type: ADD_LIST, payload: item });
  };

  useEffect(async () => {
    let isMounted = true;
    const data = await dataWatchList();
    if (isMounted && data) {
      dispatch({ type: WATCHLIST, payload: data });
    }
    return () => {
      isMounted = false;
    };
  }, []);

  const deleteListItem = (item) => {
    dispatch({ type: DELETE_LIST_ITEM, payload: item });
  };

  /* -------------------- END WATCHLIST FUNCTIONS ------------------- */

  /* ------------------------ LOGIN FUNCTIONS ----------------------- */
  const getLogin = (token) => {
    dispatch({ type: LOGIN, payload: token });
  };
  const getLogout = () => {
    dispatch({ type: LOADING });
    setTimeout(() => {
      dispatch({ type: LOGOUT });
    }, 1000);
  };
  /* ---------------------- END LOGIN FUNCTIONS --------------------- */

  /* -------------------------- DELETE SHOW ------------------------- */

  /* ------------------------ END DELETE SHOW ----------------------- */
  return (
    <AppContext.Provider
      value={{
        ...state,
        getLogin,
        getBottomSheetContent,
        setBottomSheetIndex,
        getSingleMovie,
        getSingleTvShow,
        setSearch,
        addList,
        deleteListItem,
        getLogout,
        getLoadingAllShows,
        getLoadingMovies,
        getLoadingTvshows,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
export { AppProvider, AppContext };
