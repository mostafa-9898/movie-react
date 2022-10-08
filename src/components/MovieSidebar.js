import { useEffect, useState } from "react";

// helpers
import { fetchMovieDate, fetchMovieGenres, fetchMovieGenresData } from "../helpers/fetchMovie";

// mui
import {
    Box, Divider, FormControl, InputLabel, List, ListItem, ListItemButton,
    ListItemText, MenuItem, Select, Typography
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

const MovieSidebar = ({ setDynamicState, pageNumber, setPageNumber, value, setValue, genres, setGenres }) => {

    useEffect(() => {
        fetchMovieGenres(setGenres)
        setValue(value)
    }, [])

    useEffect(() => {
        setPageNumber(1)
    }, [value])

    useEffect(() => {

        if (value === 'top_rated') {
            setValue('top_rated')
            fetchMovieDate(value, setDynamicState, pageNumber)
        } else if (value === 'popular') {
            setValue('popular')
            fetchMovieDate(value, setDynamicState, pageNumber)
        } else {
            setValue(value)
            fetchMovieGenresData(value, setDynamicState, pageNumber)
        }

    }, [value, pageNumber])




    return (
        <>

            {/* mobile and tablet */}
            <FormControl fullWidth sx={{ display: { xs: 'block', md: 'none' } }}>
                <InputLabel id="Genres">Genres</InputLabel>
                <Select
                    labelId="Category"
                    id="Category"
                    label="Category"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    sx={{ width: '100%' }}
                >
                    <MenuItem value="top_rated">Top Rated</MenuItem>
                    <MenuItem value="popular">Popular</MenuItem>

                    {genres.map(item =>
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    )}

                </Select>
            </FormControl>


            {/* for laptop */}
            <Box width='300px' sx={{ display: { xs: 'none', md: 'block' } }}>

                <Box display='flex' alignItems='flex-start' justifyContent='flex-start'
                    gap='15px' pt='30px' flexDirection='column' minHeight='300px'
                    borderRight='1px solid gray' pl='10px' pr='20px' mr='10px'
                >
                    <Typography variant='h5' component='h3'
                        fontWeight={700} sx={{ ml: '-10px' }}
                    >
                        Genres
                    </Typography>


                    <List>

                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setValue('popular')}>
                                <Box display='flex' alignItems='center' gap='5px'>
                                    <StarIcon sx={{ color: 'red' }} />
                                    <ListItemText primary="Popular" />
                                </Box>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setValue('top_rated')}>
                                <Box display='flex' alignItems='center' gap='5px'>
                                    <LocalFireDepartmentIcon sx={{ color: 'red' }} />
                                    <ListItemText primary="Top Rated" />
                                </Box>
                            </ListItemButton>
                        </ListItem>


                        <Divider />

                        {genres.map(item =>
                            <ListItem disablePadding key={item.id}>
                                <ListItemButton onClick={() => setValue(item.id)}>
                                    <Box display='flex' alignItems='center' gap='10px'>
                                        <Box width='15px' height='15px'
                                            borderRadius='50%' sx={{ backgroundColor: 'orange' }}
                                        ></Box>
                                        <ListItemText primary={item.name} />
                                    </Box>
                                </ListItemButton>
                            </ListItem>
                        )}

                    </List>

                </Box>

            </Box>
        </>
    );
}

export default MovieSidebar;