import AsyncStorage from "@react-native-async-storage/async-storage";

const StoreWatchList = async (value) => {
  try {
    const jsonWatchList = JSON.stringify(value);
    await AsyncStorage.setItem("sudahnonton_watchList", jsonWatchList);
  } catch (error) {
    console.log(error);
  }
  return;
};

export default StoreWatchList;
