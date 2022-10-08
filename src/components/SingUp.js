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


const SingUp = () => {

    const { mode } = useContext(ColorModeContext)
    const [open, setOpen] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            accepted: false
        },

        validationSchema: Yup.object({
            name: Yup.string().required('Name is Required!').max(15, 'Name must be less than 15 characters.'),
            email: Yup.string().required('Email is Required!').email('Invalid E-mail adress.'),
            password: Yup.string().required('Password is Required!').min(8, 'Password must be more than 8 characters.'),
            confirmPassword: Yup.string().required('Confirm Password is Required!').oneOf([Yup.ref('password'), ''], 'Password must match.'),
            accepted: Yup.bool().oneOf([true], 'You need to accept the terms and conditions'),
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

            <Button variant="contained" onClick={() => setOpen(true)}>
                Sign up
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
                        Create Account
                    </Typography>

                    <Box>
                        <form onSubmit={formik.handleSubmit}>

                            <Box mb='10px'>
                                <Typography variant='body1' fontWeight={600} color='primary'>
                                    Name:
                                </Typography>
                                <TextField fullWidth size='small'
                                    type='text'
                                    name='name'
                                    id='name'
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.name && formik.errors.name ?
                                    <p style={{
                                        backgroundColor: '#f42b03', borderRadius: '10px', fontSize: '13px',
                                        width: 'max-content', color: 'white', padding: '5px', margin: '0', marginTop: '5px'
                                    }}>{formik.errors.name}</p>
                                    : null
                                }
                            </Box>

                            <Box mb='10px'>
                                <Typography variant='body1' fontWeight={600} color='primary'>
                                    E-mail:
                                </Typography>
                                <TextField fullWidth size='small'
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    type='text'
                                    name='email'
                                    id='email'
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
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    type='text'
                                    name='password'
                                    id='password'
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
                                <Typography variant='body1' fontWeight={600} color='primary'>
                                    Confirm Password:
                                </Typography>
                                <TextField fullWidth size='small'
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    type='text'
                                    name='confirmPassword'
                                    id='confirmPassword'
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                    <p style={{
                                        backgroundColor: '#f42b03', borderRadius: '10px', fontSize: '13px',
                                        width: 'max-content', color: 'white', padding: '5px', margin: '0', marginTop: '5px'
                                    }}>{formik.errors.confirmPassword}</p>
                                    : null
                                }
                            </Box>

                            <Box mb='10px'>
                                <FormControlLabel control={
                                    <Checkbox color='info'
                                        value={formik.values.accepted}
                                        onChange={formik.handleChange}
                                        name='accepted'
                                        id='accepted'
                                        onBlur={formik.handleBlur}
                                    />
                                }
                                    sx={{ color: `${mode === 'light' ? 'black' : 'white'}` }}
                                    label="I accept term of privacy policy" />
                                {formik.touched.accepted && formik.errors.accepted ?
                                    <p style={{
                                        backgroundColor: '#f42b03', borderRadius: '10px', fontSize: '13px',
                                        width: 'max-content', color: 'white', padding: '5px', margin: '0', marginTop: '5px'
                                    }}>{formik.errors.accepted}</p>
                                    : null
                                }
                            </Box>

                            <Button sx={{ mt: '10px', py: '8px', fontSize: '18px' }} variant='contained'
                                type='submit' color='info' fullWidth>
                                Create
                            </Button>



                        </form>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
}

export default SingUp;