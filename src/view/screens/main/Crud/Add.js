import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import {
  ActivityIndicator,
  Headline,
  Subheading,
  Text,
  TextInput,
} from "react-native-paper";

import { globalstyles } from "../../../../styles/globalstyles";
import { theme } from "../../../../styles/themes";
import { TMDB_API_KEY } from "@env";
import axios from "axios";
import TmdbButton from "../components/TmdbButton";
import { windowWidth } from "../../../../context/initValues";

const Add = ({ navigation }) => {
  const [resultMovie, setResultMovie] = useState([]);
  const [resultTvShows, setResultTvShows] = useState([]);
  const [keyword, setKeyword] = useState(null);
  const [searchKey, setSearchKey] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setResultMovie([]);
    setResultTvShows([]);
    setKeyword(null);
    setSearchKey(null);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (searchKey && isMounted) {
      const url1 =
        "https://api.themoviedb.org/3/search/movie?api_key=" +
        TMDB_API_KEY +
        "&query=" +
        searchKey.toString();
      const url2 =
        "https://api.themoviedb.org/3/search/tv?api_key=" +
        TMDB_API_KEY +
        "&query=" +
        searchKey.toString();

      axios
        .all([axios.get(url1), axios.get(url2)])
        .then((res) => {
          let movies;
          let tvshows;

          if (res[0].data.results.length > 23) {
            movies = res[0].data.results.slice(0, 20);
          } else {
            movies = res[0].data.results;
          }
          if (res[1].data.results.length > 20) {
            tvshows = res[1].data.results.slice(0, 20);
          } else {
            tvshows = res[1].data.results;
          }

          setResultMovie(movies);
          setResultTvShows(tvshows);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [searchKey]);

  if (loading) {
    return (
      <View style={globalstyles.container}>
        <ActivityIndicator
          animating={true}
          size="large"
          color={theme.colors.primary}
        />
      </View>
    );
  } else {
    return (
      <View style={globalstyles.container}>
        <TextInput
          label="Search movies, tv shows, or genres..."
          value={keyword}
          blurOnSubmit={false}
          onChangeText={(keyword) => setKeyword(keyword ? keyword : null)}
          underlineColor={theme.colors.primary}
          clearTextOnFocus={true}
          onSubmitEditing={() => {
            Keyboard.dismiss();
            setSearchKey(keyword);
          }}
          left={
            <TextInput.Icon
              size={32}
              name="magnify"
              style={{ justifyContent: "flex-end" }}
            />
          }
          style={{
            width: "100%",
            height: 80,
            backgroundColor: theme.colors.primaryOpacity,
            color: theme.colors.light,
          }}
        />

        <ScrollView
          style={{ width: "100%" }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {!keyword && (
            <View>
              <Subheading style={styles.subHeading}>
                Search using Movie or TV Show title
              </Subheading>
            </View>
          )}
          {keyword && (
            <View>
              {resultMovie.length < 1 && resultTvShows.length < 1 ? (
                <Subheading style={styles.subHeading}>
                  No Result Found
                </Subheading>
              ) : (
                <View>
                  {!resultMovie.length < 1 && (
                    <>
                      <Subheading style={styles.subHeading}>Movies</Subheading>
                      <View style={styles.resultContainer}>
                        {resultMovie.map((item, index) => {
                          if (item.poster_path) {
                            return (
                              <TmdbButton
                                key={"key" + index}
                                item={item}
                                type="movie"
                                navigation={navigation}
                              />
                            );
                          } else {
                            return <View key={"key" + index}></View>;
                          }
                        })}
                      </View>
                    </>
                  )}

                  {!resultTvShows.length < 1 && (
                    <>
                      <Subheading style={styles.subHeading}>Shows</Subheading>
                      <View style={styles.resultContainer}>
                        {resultTvShows.map((item, index) => {
                          if (item.poster_path) {
                            return (
                              <TmdbButton
                                key={"key" + index}
                                item={item}
                                type="tvshows"
                                navigation={navigation}
                              />
                            );
                          } else {
                            return (
                              <View
                                style={{ width: 0 }}
                                key={"key" + index}
                              ></View>
                            );
                          }
                        })}
                      </View>
                    </>
                  )}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
};

export default Add;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.background,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
    padding: 15,
  },
  subHeading: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 20,
  },
  resultContainer: {
    width: windowWidth,
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
});
