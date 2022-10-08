import { useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";
import axios from "axios";

// urls
import { KEY_ULR, MOVIE_IMAGE_URL } from "../api/urls";

// mui
import { Box, Typography, useMediaQuery } from "@mui/material";

// swiper
import { Pagination, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Recommendations = ({ id, location }) => {

    const [recommends, setRecommends] = useState([])
    const navigate = useNavigate()
    const isMobile = useMediaQuery('(max-width:450px)')
    const isTablet = useMediaQuery('(max-width:900px)')

    useEffect(() => {
        const fetchRecommends = async () => {
            const response = await axios.get(`https://api.themoviedb.org/3/${location}/${id}/recommendations?api_key=${KEY_ULR}&language=en-US&page=1`)
            setRecommends(response.data.results)
            // console.log(response.data.results);
        }
        fetchRecommends()
    }, [])

    return (
        <Box width={{ xs: '90%', md: '80%' }} m='auto' mt='40px'>

            <Typography variant="h6" component='h2' fontWeight={600} mb='20px'>
                Recommends:
            </Typography>

            <Swiper
                slidesPerView={isMobile ? 1 : isTablet ? 3 : 4}
                freeMode={true}
                speed={1000}
                pagination={{
                    dynamicBullets: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
                style={{ zIndex: '20', textAlign: 'center' }}
            >
                {recommends.map(item =>
                    <SwiperSlide key={item.id}>


                        <Box onClick={() => {
                            navigate(`/${location}/${item.id}`, { replace: true })
                            window.location.reload(false)
                        }}>
                            <Box pb='40px' sx={{ cursor: 'pointer' }}>
                                <img src={MOVIE_IMAGE_URL + item.poster_path} alt={item.title}
                                    width='200px' height='300px' style={{ borderRadius: '10px' }}
                                />
                            </Box>
                        </Box>

                    </SwiperSlide>
                )}
            </Swiper>
        </Box>
    );
}

export default Recommendations;