var axios = require("axios");
var FormData = require("form-data");
var data = new FormData();
data.append("genres", "action");
data.append("image", "/sN1d1WVEhcc7rrstiApJyF7VJnV.jpg");
data.append("is_favorite", "0");
data.append("my_comment", "");
data.append(
  "overview",
  "The film contains five stories set on desolate stretches of a desert highway. Two men on the run from their past, a band on its way to a gig, a man struggling to get home, a brother in search of his long-lost sister and a family on vacation are forced to confront their worst fears and darkest secrets in these interwoven tales."
);
data.append("release_date", "2015-09-17");
data.append("tagline", "One way in, no way out.");
data.append("title", "Southbound");
data.append("movie_id", "354251");

var config = {
  method: "post",
  url: "https://sudahnonton.000webhostapp.com/api/movies",
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzc0ZjQ5NTU2YTkxMjY5YzQxMGNkZTE1NzcxMzcxYTQwY2QwZjE3YTY1YmRkNmJkM2I5N2MwMTczNmZjY2ZmYWZkZGE0OGQyYjJjZjBiMzMiLCJpYXQiOjE2NDkzOTI5NjMuNjYwNzg5LCJuYmYiOjE2NDkzOTI5NjMuNjYwNzkzLCJleHAiOjE2ODA5Mjg5NjMuNjU2NjkzLCJzdWIiOiIyIiwic2NvcGVzIjpbXX0.cWQKUypyZhGdcupgcTMSPgKsKAIgsFKIqgwxpfcc1RJ8svbAInxOVkORbcc6xgULWnB_-6z8Ty5t9OSRP-bBKoStrYKUDEJLuREW6__a3jxMXNsbjYeWebxaW61-fD0RrFBc9rlJ1IB9Yg8azhLWPEUxNhLY4xlaj0KlsV4d0ef_BiHcoteuudfn3svI-YsXMQeX4rknTFF13DKL48hSaL1K-ADvA0JNYDbMY6FvHw6dLyjTswkLXEov0gg5ZVSZntTuIHbwn3Spnf6H5m27665vdUrElB6euvAE2bbmEychwuEwb-3e-R28qEvW26FZ-S-pewQqZmwGTOC9L8-Q52YoSW564N9gZh7OkL_kAK6VBwpyErkGaFnpxpWdUnjT1fj5jOUPOXQzev2NAPI9wt4flhS07OUN8AhTBttGfo218NSA6XFuotrC5D2_0mzjOCAyDWSW8wvuS-wSLwsC9QuROvXxlsDVSzu3DSJ68fk0U8SjHB44NXNQ0y1SF5k8iE3E5XqwvzGCwRljFc7KwS52uVgiT05bWtlUljqnmcDQe9_wK3RP2OUVvLHu6s3_I5yhahhm9mbGr8hc6_uB1UsGqS3Xfy263OrX4S62_Pmm_7sQ9C90evn8iCqaLBxwDGV0oOwBrJyPDo1Xpy_o9TcjIIlGnZYCy_PUgNsaTLo",
    ...data.getHeaders(),
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
