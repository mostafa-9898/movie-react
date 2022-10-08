import axios from "axios"

// urls
import { GET_GENRES_Tv, KEY_ULR } from "../api/urls"


// fetch all the populat tv or top rated tv
export const fetchTvData = async (value, setDynamicState, pageNumber) => {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${value}?api_key=${KEY_ULR}&language=en-US&page=${pageNumber}`)
    setDynamicState(response.data.results)
    // console.log(response.data);
}

// fetch all the genres
export const fetchTvGenres = async (setGenres) => {
    const response = await axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${KEY_ULR}&language=en-US`)
    setGenres(response.data.genres)
    // console.log(response.data.genres);
}

// fetch the tv of the genres that client select
export const fetchTvGenresData = async (value, setDynamicState, pageNumber) => {
    const response = await axios.get(`${GET_GENRES_Tv}${value}&page=${pageNumber}`)
    setDynamicState(response.data.results)
    // console.log(response.data.results);
}