import { useContext, useState } from 'react';

// mui
import Modal from '@mui/material/Modal';
import {
    Box, Button, Checkbox, FormControlLabel,
    TextField, Typography
} from '@mui/material';

// formik
import { useFormik } from 'formik';
import * as Yup from 'yup'

// mode context
import { ColorModeContext } from '../context/theme/MUI_MODE';


const LogIn = () => {

    const { mode } = useContext(ColorModeContext)
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object({
            email: Yup.string().required('Email is Required!').email('Invalid E-mail adress.'),
            password: Yup.string().required('Password is Required!').min(8, 'Password must be more than 8 characters.'),
        }),
    })

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: { xs: 290, sm: 290, md: 350 },
        bgcolor: `${mode === 'light' ? '#e9ecef' : '#343a40'}`,
        boxShadow: 24,
        p: 4,
        borderRadius: '10px'
    };

    return (
        <div>

            <Button variant="outlined" onClick={() => setOpen(true)}>
                Log in
            </Button>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h5" textAlign='center'
                        component="h2" color='primary' fontWeight={700} mb='30px'
                    >
                        LogIn
                    </Typography>

                    <Box>
                        <form onSubmit={formik.handleSubmit}>

                            <Box mb='10px'>
                                <Typography variant='body1' fontWeight={600} color='primary'>
                                    E-mail:
                                </Typography>
                                <TextField fullWidth size='small'
                                    type='text'
                                    name='email'
                                    id='email'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email ?
                                    <p style={{
                                        backgroundColor: '#f42b03', borderRadius: '10px', fontSize: '13px',
                                        width: 'max-content', color: 'white', padding: '5px', margin: '0', marginTop: '5px'
                                    }}>{formik.errors.email}</p>
                                    : null
                                }
                            </Box>

                            <Box mb='10px'>
                                <Typography variant='body1' fontWeight={600} color='primary'>
                                    Password:
                                </Typography>
                                <TextField fullWidth size='small'
                                    type='text'
                                    name='password'
                                    id='password'
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password ?
                                    <p style={{
                                        backgroundColor: '#f42b03', borderRadius: '10px', fontSize: '13px',
                                        width: 'max-content', color: 'white', padding: '5px', margin: '0', marginTop: '5px'
                                    }}>{formik.errors.password}</p>
                                    : null
                                }
                            </Box>

                            <Box mb='10px'>
                                <FormControlLabel control={
                                    <Checkbox color='info'
                                        name='accepted'
                                        id='accepted'
                                        value={formik.values.accepted}
                                        onChange={formik.handleChange}
                                    />
                                }
                                    sx={{ color: `${mode === 'light' ? 'black' : 'white'}` }}
                                    label="Remember Me" />
                            </Box>

                            <Button sx={{ mt: '10px', py: '8px', fontSize: '18px' }} variant='contained'
                                type='submit' color='info' fullWidth>
                                LogIn
                            </Button>

                        </form>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
}

export default LogIn;