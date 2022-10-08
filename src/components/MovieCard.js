import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

// urls
import { KEY_ULR, MOVIE_IMAGE_URL } from "../api/urls";

// mui
import {
    Card, CardActionArea, CardContent,
    CardMedia, Typography
} from "@mui/material";
import { Box } from "@mui/system";


const MovieCard = ({ item }) => {

    const location = useLocation()

    const [genres, setGenres] = useState([])

    const fetchGeners = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/genre/${location.pathname === '/movie' ? 'movie' : 'tv'}/list?api_key=${KEY_ULR}&language=en-US`)
        const sameGenres = []
        for (let i in item.genre_ids) {
            for (let j in response.data.genres) {
                item.genre_ids[i] === response.data.genres[j].id && sameGenres.push(response.data.genres[j].name)
            }
        }
        setGenres(sameGenres.slice(0, 2))
    }

    useEffect(() => {
        fetchGeners()
    }, [])

    return (
        <Link to={`/${location.pathname === '/movie' ? 'movie' : 'tv'}/${item.id}`}>
            <Card sx={{ width: 280 }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="400"
                        image={MOVIE_IMAGE_URL + item.poster_path}
                        alt="movie picture"
                    />
                    <CardContent>

                        <Typography gutterBottom variant="body1" component="h2" fontWeight={700} mb='20px'>
                            {location.pathname === '/movie' ? item.title : item.name}
                        </Typography>

                        <Box display='flex' gap='10px' alignItems='center' flexWrap='wrap'>

                            {genres.map(el =>
                                <Typography key={el} variant="caption" color="text.secondary" fontWeight={600}>
                                    {el}
                                </Typography>
                            )}
                        </Box>

                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    );
}

export default MovieCard;