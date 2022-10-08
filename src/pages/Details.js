import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

// urls
import { MOVIE_IMAGE_URL } from "../api/urls";

// context
import { ColorModeContext } from "../context/theme/MUI_MODE";

// components
import Recommendations from "../components/Recommendations";

// helpers
import { fetchCasts, fetchDetails, fetchTrailer } from "../helpers/fetchDetails";

// mui
import { Button, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import StarIcon from '@mui/icons-material/Star';


const Details = () => {

    const isMobile = useMediaQuery('(max-width:900px)')
    const { mode } = useContext(ColorModeContext)
    const params = useParams()
    const location = useLocation()
    const [detailData, setDetailData] = useState({})
    const [showMoreText, setShowMoreText] = useState(false)
    const [casts, setCasts] = useState([])
    const [trailer, setTrailer] = useState([])


    useEffect(() => {

        fetchDetails(location, params, setDetailData)
        fetchCasts(location, params, setCasts)
        fetchTrailer(location, params, setTrailer)

        window.scrollTo({
            top: 0,
            left: 0,
        })

    }, [])


    return (
        <Box position='relative' >

            <Box>

                {/* poster for background */}
                <Box
                    sx={{
                        position: 'relative',
                        backgroundImage: `url(${MOVIE_IMAGE_URL + (isMobile ? detailData.poster_path : detailData.backdrop_path)})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        width: '100%',
                        p: '20rem 0'
                        ,
                        "&::after": {
                            content: '""',
                            position: 'absolute',
                            display: 'block',
                            inset: '0',
                            width: '100%',
                            backgroundColor: 'rgba(0,0,0,.3)',
                            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), ${mode === 'dark' ? 'rgba(40,40,40,1)' : 'rgba(255, 255, 255,1)'})`
                        }
                    }}
                >

                </Box>

                {/* content of movie or tv */}
                <Box mt='-200px' position='relative' px='2rem'
                    display='flex' justifyContent='center' gap='50px' >

                    <Box display={{ xs: 'none', lg: 'block' }}>
                        <img src={MOVIE_IMAGE_URL + detailData.poster_path}
                            width='400px' height='600px' alt='poster' style={{ borderRadius: '10px' }} />
                    </Box>

                    <Box width={{ xs: '100%', lg: '50%' }}>

                        <Typography variant={isMobile ? 'h4' : 'h2'} component='h1' fontWeight={700}>
                            {detailData.title || detailData.name}
                        </Typography>

                        <Box display='flex' flexWrap='wrap' alignItems='baseline' gap='30px' mt='20px'>

                            <Box display='flex' alignItems='baseline' gap='10px'>
                                <StarIcon sx={{ color: 'orange', fontSize: '25px', alignSelf: 'center' }} />
                                <Typography variant='h6' component='h1' fontWeight={500}>
                                    {Object.keys(detailData).length && detailData.vote_average.toFixed(1)} | <span style={{ fontWeight: '500', fontSize: '14px' }}>{detailData.vote_count}</span>
                                </Typography>
                            </Box>

                            <Box display='flex' alignItems='center' gap='10px'>
                                {Object.keys(detailData).length && detailData.genres.slice(0, 3).map(item => <span style={{ fontSize: '14px' }} key={item.id}>{item.name}</span>)}
                            </Box>

                        </Box>


                        <Box width={{ xs: '100%', lg: '80%' }}>
                            <Typography variant="body2" component='h3' my='20px'>
                                {showMoreText ?
                                    detailData.overview :
                                    Object.keys(detailData).length && detailData.overview.slice(0, 100)
                                }
                                <span style={{ marginLeft: '10px', cursor: 'pointer', color: mode === 'dark' ? 'skyblue' : 'blue' }}
                                    onClick={() => setShowMoreText(!showMoreText)}
                                >
                                    {showMoreText ? 'Less' : 'More'}
                                </span>
                            </Typography>
                        </Box>

                        <Box width={{ xs: '100%', lg: '80%' }}>
                            <Typography variant="body1" fontWeight={600} mb='10px'>
                                Populer Casts :
                            </Typography>
                            <Box display='flex' alignItems='center' flexWrap='wrap' gap='10px'>
                                {casts.length && casts.slice(0, 11).map(item =>
                                    <img src={MOVIE_IMAGE_URL + item.profile_path} alt={item.name} key={item.id}
                                        width='70px' height='100px' style={{ borderRadius: '5px' }}
                                    />
                                )
                                }
                            </Box>

                        </Box>
                        {/* trailer */}
                        <Box mt='40px' display='flex' flexWrap='wrap' gap='20px'>
                            {detailData.imdb_id &&
                                <a href={`https://www.imdb.com/title/${detailData.imdb_id}`} target="_blank">
                                    <Button variant="contained" color="info" sx={{ px: '30px' }}>
                                        Imdb
                                    </Button>
                                </a>
                            }
                            {trailer &&
                                <a href={`https://www.youtube.com/embed/${trailer.key}`} target="_blank">
                                    <Button variant="contained" color="info" sx={{ px: '30px' }}>
                                        Trailer
                                    </Button>
                                </a>
                            }
                        </Box>

                    </Box>
                </Box>

                {/* similar movies */}
                {Object.keys(detailData).length && <Recommendations id={detailData.id} location={location.pathname.includes('movie') ? 'movie' : 'tv'} />}

            </Box>

        </Box>
    );
}

export default Details;