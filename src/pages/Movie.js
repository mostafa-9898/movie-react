import { useState } from "react";

// mui
import { Box, Pagination, Typography, useMediaQuery, } from "@mui/material";
import { Stack } from "@mui/system";

// components
import MovieCard from "../components/MovieCard";
import MovieSidebar from "../components/MovieSidebar";

const Movie = () => {

    const isMobile = useMediaQuery('(max-width:900px)')

    const [dynamicState, setDynamicState] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [value, setValue] = useState('popular')
    const [genres, setGenres] = useState([])

    const handleChange = (event, value) => {
        setPageNumber(value);

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        })

    };

    return (
        <Box px='20px'>

            <Box py={{ xs: '5px', md: '40px' }}
                display='flex' justifyContent='space-between' gap='10px'
                flexDirection={{ xs: 'column', md: 'row' }}
            >

                {/* Side bar for filter the products */}
                <MovieSidebar
                    setDynamicState={setDynamicState}
                    pageNumber={pageNumber} setPageNumber={setPageNumber}
                    value={value} setValue={setValue}
                    genres={genres} setGenres={setGenres}
                />

                {/* Products card */}
                <Box width='100%'>

                    <Typography variant="h4" component='h1'
                        fontWeight={600} mb='50px' ml={{ xs: '0', md: '3rem' }}
                        textAlign={{ xs: 'center', md: 'start' }}
                    >
                        {value === 'popular' && 'Popular'}
                        {value === 'top_rated' && 'Top Rated'}
                        {genres.map(el =>
                            el.id === value && el.name
                        )}
                    </Typography>

                    <Box display='flex' flexWrap='wrap'
                        gap='20px' justifyContent='center'>
                        {dynamicState.map(item =>
                            <MovieCard key={item.id} item={item} />
                        )}
                    </Box>
                </Box>



            </Box>

            {/* pagination */}
            <Box display='flex' justifyContent='center' mt='20px' pb={{ xs: '10px', md: '50px' }} ml={{ xs: 0, md: 23 }}>
                <Stack spacing={1}>
                    <Pagination count={100} page={pageNumber}
                        onChange={handleChange} size='large'
                        siblingCount={isMobile ? -1 : 1}
                    />
                </Stack>
            </Box>

        </Box>
    );
}

export default Movie;