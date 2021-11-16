import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_TMDB_URL,
});

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Following requests can be found on the this link
// https://developers.themoviedb.org/3/trending/get-trending
// Thankfully, the trending one is straight forward from link. However, to do genres you follow the link and use discover
// But at the end of the url you must add the  with_genres="". the value will be a number.
// I am not sure link is to convert numbers to genres but I found a person on youtube using these codes so now we can sort by genres.
// added us language to make it local like netflix does, also decided to do order by popularity to have more views. Marketing 101.

export const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}`,
  fetchOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`, // 213 = netflix
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=28`, // 28 = action
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=35`, // 35 =  comedy
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=27`, // 27 = horror
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=10749`, // 10749 = romance
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=99`, // 99 = documentary
};

export default axiosInstance;
