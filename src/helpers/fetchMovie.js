import axios from "axios"

// urls
import { GET_GENRES_MOVIE, KEY_ULR } from "../api/urls"


// fetch all the populat movies or top rated movies
export const fetchMovieDate = async (value, setDynamicState, pageNumber) => {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${value}?api_key=${KEY_ULR}&language=en-US&page=${pageNumber}`)
    setDynamicState(response.data.results)
    // console.log(response.data);
}

// fetch all the genres
export const fetchMovieGenres = async (setGenres) => {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${KEY_ULR}&language=en-US`)
    setGenres(response.data.genres)
    // console.log(response.data.genres);
}

// fetch the movies of the genres that client select
export const fetchMovieGenresData = async (value, setDynamicState, pageNumber) => {
    const response = await axios.get(`${GET_GENRES_MOVIE}${value}&page=${pageNumber}`)
    setDynamicState(response.data.results)
    // console.log(response.data.results);
}