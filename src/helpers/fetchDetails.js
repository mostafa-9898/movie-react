import axios from "axios"
import { KEY_ULR } from "../api/urls"


export const fetchDetails = async (location, params, setDetailData) => {
    const response = await axios.get(`https://api.themoviedb.org/3/${location.pathname.includes('movie') ? 'movie' : 'tv'}/${params.id}?api_key=${KEY_ULR}&language=en-US`)
    setDetailData(response.data)
    // console.log(response.data);
}

export const fetchCasts = async (location, params, setCasts) => {
    const response = await axios.get(`https://api.themoviedb.org/3/${location.pathname.includes('movie') ? 'movie' : 'tv'}/${params.id}/credits?api_key=${KEY_ULR}&language=en-US`)
    setCasts(response.data.cast)
    // console.log(response.data.cast);
}

export const fetchTrailer = async (location, params, setTrailer) => {
    const response = await axios.get(`https://api.themoviedb.org/3/${location.pathname.includes('movie') ? 'movie' : 'tv'}/${params.id}/videos?api_key=${KEY_ULR}&language=en-US`)
    const teasers = response.data.results.filter(item => item.type === 'Teaser' || 'Trailer')
    const teaser = teasers[0]
    setTrailer(teaser)
    // console.log(teaser);
}