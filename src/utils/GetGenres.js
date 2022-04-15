const GetGenres = (array) => {
  const newGenres = [...new Set(array.map((item) => item.genres))];
  return newGenres;
};

export default GetGenres;
