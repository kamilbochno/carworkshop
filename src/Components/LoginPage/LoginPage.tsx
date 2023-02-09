import React, { useState } from 'react';
import './Styles.scss';
import Navbar from '../Navbar/Navbar.tsx';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Email from '@mui/icons-material/Email';
import Box from '@mui/material/Box';
import Password from '@mui/icons-material/Password';
import CardMedia from '@mui/material/CardMedia';
import image from '../../Images/background5.jpg'
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider.tsx';

const LoginPage = () => {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [isErrorEmail, setIsErrorEmail] = useState(false)
    const [isErrorPassword, setIsErrorPassword] = useState(false)

    let formErrors = {emailError: "", passwordError: ""};

    const handleEmail = (event) => {
        const email = event.target.value;
        setEmail(email);

        if (!email) {
            formErrors.emailError = "Email is required";
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)
        ) {
            formErrors.emailError = "Wrong email";
        }
        setEmailError(formErrors.emailError);
        !formErrors.emailError ? setIsErrorEmail(false) : setIsErrorEmail(true)
    } 

    const handlePassword = (event) => {
        const password = event.target.value;
        setPassword(password);

        if (!password) {
            formErrors.passwordError
 = "Password is required";
        }
        setPasswordError(formErrors.passwordError);
        !formErrors.passwordError ? setIsErrorPassword(false) : setIsErrorPassword(true)
    }


    const submitUser = async (e) => {
        e.preventDefault();
        const userData = { email: email, password: password }

        if (userData.email && userData.password) {
                axios.post('/loginUser', userData)
                .then(res => {
                    if (res.status === 200) {
                        localStorage.setItem('token', res.data.token)
                        setAuth(localStorage.getItem('token'));
                        navigate('/')
                    }
                })
                .catch (err => {console.log(err)})
        }

        if (!userData.email) {
            setIsErrorEmail(true)
            formErrors.emailError = "Email is required"
            setEmailError(formErrors.emailError)
        }
        if (!userData.password) {
            setIsErrorPassword(true)
            formErrors.passwordError = "Password is required"
            setPasswordError(formErrors.passwordError)
        }
    }

    return (
        <div>
        <Navbar></Navbar>
        <div className='Main'>
            <Container display="grid" gridTemplateColumns="1fr 1fr" gridTemplateRows="1fr" maxWidth="md">
            <form onSubmit={ submitUser }>
            <div className="card-container">
            <div className="card-container__image">
                <CardMedia
                        sx = {{ height: '100%'}}
                        component="img"
                        alt="car"
                        src={image}/>
                        </div>
                <div className="card-container__form">
                    <CardContent>
                    <Box display="flex" alignItems="center" flexDirection="column">
                        <Typography sx = {{ fontSize: 21 }} color="text.secondary" gutterBottom>
                            Welcome to AutoFixSolutions
                        </Typography>
                        </Box>
                        <Box display="flex" alignItems="center" flexDirection="column">
                        <FormControl variant="standard">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Email sx={{ color: 'action.active', mr: 1, my: 3, mt: 5 }} />
                                <TextField error={isErrorEmail} helperText={emailError} id="Email" label="Email" variant="outlined" onChange={(e) => handleEmail(e)}/>
                            </Box>
                        </FormControl>
                        <FormControl variant="standard">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Password sx={{ color: 'action.active', mr: 1, my: 3, mt: 5 }} />
                                <TextField error={isErrorPassword} helperText={passwordError} type='password' id="Password" label="Password" variant="outlined" onChange={(e) => handlePassword(e)} />
                            </Box>
                        </FormControl>
                        </Box>
                    </CardContent>
                    <Box display="flex" alignItems="center" flexDirection="column">
                    <CardActions>
                        <Button type="submit" variant="contained" size="small">Sign in</Button>
                    </CardActions>
                    </Box>
                </div>
                </div>
                </form>
                </Container>
        </div>
    </div>
    )
}

export default LoginPage;