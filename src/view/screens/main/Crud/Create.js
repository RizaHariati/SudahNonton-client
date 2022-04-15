import axios from "axios";
import id from "faker/lib/locales/id_ID";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Caption, Subheading, TextInput } from "react-native-paper";
import { useGlobalContext } from "../../../../context/AppContext";
import { windowHeight } from "../../../../context/initValues";
import { globalstyles } from "../../../../styles/globalstyles";
import { theme } from "../../../../styles/themes";
import { TMDB_API_KEY } from "@env";
import GetGenres from "../../../../utils/GetGenres";
import { Picker } from "@react-native-picker/picker";
import GetFormData from "../../../../utils/GetFormData";
import FindMovie from "../../../../utils/FindMovie";
import FindTvShow from "../../../../utils/FindTvShow";

const Create = ({ navigation, route }) => {
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exist, setExist] = useState(false);
  const [height, setHeight] = useState(60);
  const [selectGenre, setSelectGenre] = useState("action");
  const [selectFavorite, setSelectFavorite] = useState(0);
  const [keyword, setKeyword] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { allMovies, allTvShows } = useGlobalContext();

  const { token, getLoadingMovies, getLoadingTvshows } = useGlobalContext();

  const editOverview = (data) => {
    const overview = data.overview.replace(/,/g, "");

    return overview;
  };
  const settingMovie = (data) => {
    const movie = {
      movie_id: data.id,
      title: data.title,
      image: data.backdrop_path ? data.backdrop_path : data.poster_path,
      tagline: data.tagline ? data.tagline : null,
      release_date: data.release_date,
      genres: "adventure",
      overview: data.overview,
      is_favorite: 0,
      my_comment: null,
    };
    return movie;
  };

  const settingTvShow = (data) => {
    const tvshow = {
      tv_id: data.id,
      name: data.name,
      image: data.backdrop_path ? data.backdrop_path : data.poster_path,
      tagline: data.tagline ? data.tagline : null,
      number_of_seasons: data.number_of_seasons,
      genres: "adventure",
      overview: data.overview,
      is_favorite: 0,
      my_comment: null,
    };
    return tvshow;
  };

  /* ----------------------- SUBMIT DATA FORM ----------------------- */

  const handleSubmit = async () => {
    let text = "";
    let comment = "";
    if (keyword) {
      text = keyword.replace(/\n/g, ". ");
      comment = "<div>" + text + "</div>";
    }
    const upperGenre =
      selectGenre.charAt(0).toUpperCase() + selectGenre.slice(1);
    const newOverview = editOverview(show);
    const showFinal = await {
      ...show,
      overview: newOverview,
      genres: upperGenre,
      is_favorite: selectFavorite,
      my_comment: text,
    };

    const stringShow = JSON.stringify(showFinal);
    const final = stringShow
      .replace(/"|{|}/g, "")
      .replace(/,/g, "\n")
      .replace(/:/g, " : ");
    Alert.alert("Alert", `Please check the detail : \n\n ${final}`, [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setShow({
            ...show,
            genres: upperGenre,
            is_favorite: selectFavorite.toString(),
            my_comment: comment,
          });

          setSubmitting(true);
        },
      },
    ]);
  };

  /* --------------------- END SUBMIT DATA FORM --------------------- */

  /* ------------------- POST DATA TO SUDAHNONTON ------------------- */

  const chectExist = (show) => {
    let checkExist;
    if (route.params.type === "movie") {
      checkExist = FindMovie(show.movie_id, allMovies);
    } else {
      checkExist = FindTvShow(show.tv_id, allTvShows);
    }
    if (checkExist) {
      setExist(true);
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    let isMounted = true;
    const url1 = "https://sudahnonton.000webhostapp.com/api/movies";
    const url2 = "https://sudahnonton.000webhostapp.com/api/tvshows";
    const url = route.params.type === "movie" ? url1 : url2;

    if (submitting) {
      if (chectExist(show)) return;
      const formData = GetFormData(show);
      if (isMounted && formData) {
        fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        })
          .then((res) => {
            const showTitle =
              route.params.type === "movie" ? show.title : show.name;
            if (res.ok) {
              Alert.alert("Alert", `${showTitle} added to your show list`, [
                {
                  text: "OK",
                  onPress: () => {
                    navigation.navigate("Bottom");
                    if (route.params.type === "movie") {
                      return getLoadingMovies();
                    } else {
                      return getLoadingTvshows();
                    }
                  },
                },
              ]);
            }
          })
          .catch((err) => console.log(err.response.data));
      }
    }
    return () => {
      isMounted = false;
      setSubmitting(false);
    };
  }, [submitting]);

  /* ----------------- END POST DATA TO SUDAHNONTON ----------------- */

  /* ---------------------- GET DATA FROM TMDB ---------------------- */
  useEffect(() => {
    let isMounted = true;
    setExist(false);
    if (route.params) {
      const item = route.params.item;

      if (route.params.type === "movie") {
        const checkExist = FindMovie(item.id, allMovies);

        if (checkExist) {
          setLoading(false);
          return setExist(true);
        } else {
          if (isMounted) {
            axios
              .get(
                `https://api.themoviedb.org/3/movie/${item.id}?api_key=${TMDB_API_KEY}`
              )
              .then((res) => {
                const data = res.data;
                const movie = settingMovie(data);
                setShow(movie);
                return setLoading(false);
              })
              .catch((err) => console.log(err));
          }
        }
      } else if (route.params.type === "tvshows") {
        const checkExist = FindTvShow(item.id, allTvShows);

        if (checkExist) {
          setLoading(false);
          return setExist(true);
        } else {
          if (isMounted) {
            axios
              .get(
                `https://api.themoviedb.org/3/tv/${item.id}?api_key=${TMDB_API_KEY}`
              )
              .then((res) => {
                const data = res.data;
                const tvshow = settingTvShow(data);
                setShow(tvshow);
                return setLoading(false);
              })
              .catch((err) => console.log(err));
          }
        }
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);

  /* -------------------- END GET DATA FROM TMDB -------------------- */

  if (loading) {
    return (
      <View style={globalstyles.container}>
        <View>
          <ActivityIndicator
            animating={true}
            size="large"
            color={theme.colors.primary}
          />
        </View>
      </View>
    );
  }
  if (exist) {
    return (
      <View style={globalstyles.container}>
        <View>
          <Subheading style={[styles.subHeading, { padding: 30 }]}>
            {route.params.type === "movie"
              ? route.params.item.title
              : route.params.item.name}
            &nbsp;is already on your list
          </Subheading>
        </View>
      </View>
    );
  } else {
    const genres =
      route.params.type === "movie"
        ? GetGenres(allMovies)
        : GetGenres(allTvShows);
    return (
      <View style={globalstyles.container}>
        <ScrollView style={{ width: "100%" }}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w300${show.image}`,
            }}
            style={styles.image}
          />
          <TextInput
            label="Comment"
            value={keyword}
            onChangeText={(keyword) => setKeyword(keyword ? keyword : null)}
            underlineColor={theme.colors.primary}
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            multiline={true}
            numberOfLines={5}
            left={
              <TextInput.Icon
                size={24}
                name="message-reply-text"
                style={styles.textInputIcon}
              />
            }
            style={styles.textInput}
          />

          <TextInput
            editable={false}
            label={route.params.type === "movie" ? "Movie_id" : "Tv_id"}
            defaultValue={
              route.params.type === "movie"
                ? show.movie_id.toString()
                : show.tv_id.toString()
            }
            underlineColor={theme.colors.primary}
            left={
              <TextInput.Icon
                size={24}
                name="chart-donut"
                style={styles.textInputIcon}
              />
            }
            style={styles.textInput}
            selectionColor={theme.colors.primary}
          />
          <TextInput
            editable={false}
            label={
              route.params.type === "movie" ? "Movie Title" : "TV Show Title"
            }
            defaultValue={
              route.params.type === "movie" ? show.title : show.name
            }
            underlineColor={theme.colors.primary}
            left={
              <TextInput.Icon
                size={24}
                name="format-title"
                style={styles.textInputIcon}
              />
            }
            style={styles.textInput}
          />
          <TextInput
            editable={false}
            label={
              route.params.type === "movie"
                ? "Release Date"
                : "Number of seasons"
            }
            defaultValue={
              route.params.type === "movie"
                ? show.release_date
                : show.number_of_seasons.toString()
            }
            underlineColor={theme.colors.primary}
            left={
              <TextInput.Icon
                size={24}
                name="update"
                style={styles.textInputIcon}
              />
            }
            style={styles.textInput}
          />
          {show.tagline && (
            <TextInput
              editable={false}
              label="Tagline"
              defaultValue={show.tagline}
              underlineColor={theme.colors.primary}
              left={
                <TextInput.Icon
                  size={22}
                  name="tag"
                  style={styles.textInputIcon}
                />
              }
              style={styles.textInput}
            />
          )}
          <TextInput
            editable={false}
            label="Overview"
            defaultValue={show.overview}
            underlineColor={theme.colors.primary}
            onContentSizeChange={(e) =>
              setHeight(e.nativeEvent.contentSize.height)
            }
            multiline
            left={
              <TextInput.Icon
                size={24}
                name="clipboard-text"
                style={[styles.textInputIcon, { height: height - 30 }]}
              />
            }
            style={[styles.textInput, { height: height }]}
          />
          <Caption style={styles.caption}>Genres</Caption>
          <Picker
            style={styles.genres}
            itemStyle={{ padding: 20 }}
            mode="dialog"
            selectedValue={selectGenre}
            onValueChange={(itemValue, itemIndex) => setSelectGenre(itemValue)}
            dropdownIconColor={theme.colors.text}
          >
            {genres.map((genre, index) => {
              return (
                <Picker.Item
                  style={styles.genresItem}
                  key={index}
                  label={"     " + genre}
                  value={genre}
                />
              );
            })}
          </Picker>
          <Caption style={styles.caption}>Favorite</Caption>
          <Picker
            style={styles.genres}
            itemStyle={{ padding: 20 }}
            mode="dialog"
            selectedValue={selectFavorite}
            onValueChange={(itemValue, itemIndex) =>
              setSelectFavorite(itemValue)
            }
            dropdownIconColor={theme.colors.text}
          >
            <Picker.Item
              style={styles.genresItem}
              label={"     " + "false"}
              value={0}
            />
            <Picker.Item
              style={styles.genresItem}
              label={"     " + "true"}
              value={1}
            />
          </Picker>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              mode="outlined"
              color={theme.colors.background}
              style={styles.button}
              onPress={() => {
                handleSubmit();
              }}
            >
              Submit
            </Button>
          </View>
        </ScrollView>
      </View>
    );
  }
};

export default Create;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: windowHeight * 0.3,
    marginBottom: 20,
  },
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
  textInput: {
    width: "100%",
    // height: 60,
    backgroundColor: theme.colors.primaryOpacity,
    color: theme.colors.light,
    marginBottom: 20,
    fontSize: 14,
    paddingLeft: 20,
  },
  textInputIcon: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: 27,
    color: theme.colors.text,
  },
  genres: {
    backgroundColor: theme.colors.primaryOpacity,
    marginBottom: 20,
    height: 60,
    color: theme.colors.light,
  },
  genresItem: {
    color: theme.colors.text,
    width: "100%",
    backgroundColor: theme.colors.background,
  },
  button: {
    backgroundColor: theme.colors.primary,
    width: "40%",
    marginBottom: 50,
  },
  caption: {
    paddingLeft: 30,
    color: theme.colors.primary,
  },
});
