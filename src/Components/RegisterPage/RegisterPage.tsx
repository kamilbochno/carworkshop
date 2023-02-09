import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar.tsx';
import './Styles.scss';
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
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {

    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [firstNameError, setFirstNameError] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [isErrorFirstName, setIsErrorFirstName] = useState(false)
    const [isErrorLastName, setIsErrorLastName] = useState(false)
    const [isErrorEmail, setIsErrorEmail] = useState(false)
    const [isErrorPassword, setIsErrorPassword] = useState(false)
    const [isErrorConfirmPassword, setIsErrorConfirmPassword] = useState(false)
    const [isEmailTaken, setIsEmailTaken] = useState();
    let formErrors = {firstNameError: "", lastNameError: "", emailError: "", passwordError: "", confirmPasswordError: ""};

    const handleFirstName = (event) => {
        const first_name = event.target.value;
        setFirstName(first_name);

        if (!first_name) {
            formErrors.firstNameError = "First name is required";
        } else if (
            !/^[a-z ,.'-]+$/i.test(first_name)
        ) {
            formErrors.firstNameError = "Wrong first name";
        }

        setFirstNameError(formErrors.firstNameError)
        !formErrors.firstNameError ? setIsErrorFirstName(false) : setIsErrorFirstName(true)
    }

        const handleLastName = (event) => {
            const last_name = event.target.value;
            setLastName(last_name);

            if (!last_name) {
                formErrors.lastNameError = "Last name is required";
            } else if (
                !/^[a-z ,.'-]+$/i.test(last_name)
            ) {
                formErrors.firstNameError = "Wrong last name";
            }

            setLastNameError(formErrors.lastNameError);
            !formErrors.lastNameError ? setIsErrorLastName(false) : setIsErrorLastName(true)
        }

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
                formErrors.passwordError = "Password is required";
            }

            setPasswordError(formErrors.passwordError);
            !formErrors.passwordError ? setIsErrorPassword(false) : setIsErrorPassword(true)
        }

        const handleConfirmPassword = (event) => {
            const confirmPassword = event.target.value;
            setConfirmPassword(confirmPassword);

            if (!confirmPassword) {
                formErrors.confirmPasswordError = "Passwords didn't match";
            } else if (
                password != confirmPassword
            ) {
                formErrors.confirmPasswordError = "Passwords didn't match"
            }
            setConfirmPasswordError(formErrors.confirmPasswordError);
            !formErrors.confirmPasswordError ? setIsErrorConfirmPassword(false) : setIsErrorConfirmPassword(true)
            }

        const submitUser = async (e) => {
            e.preventDefault();
            const userData = {first_name: firstName, last_name: lastName, email: email, password: password }

            if (userData.first_name && userData.last_name && userData.email && userData.password && userData.password === confirmPassword) {
                    try {
                        const s = await axios.post('/addUser', userData)
                        .then((res) => {
                            if (res.status === 201) {
                                navigate("/login");
                            }
                        })
                        
                    }
                    catch (err) {
                        if (err.response.status === 400) {
                            setIsErrorEmail(true)
                            setEmailError(err.response.data)
                            console.log(err.response.data)
                        }
                    }
                    
            }
            if (!userData.first_name) {
                setIsErrorFirstName(true)
                formErrors.firstNameError = "First name is required"
                setFirstNameError(formErrors.firstNameError)
            }
            if (!userData.last_name) {
                setIsErrorLastName(true)
                formErrors.lastNameError = "Last name is required"
                setLastNameError(formErrors.lastNameError)
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
            if (userData.password !== confirmPassword || confirmPassword === "" ) {
                setIsErrorConfirmPassword(true)
                formErrors.confirmPasswordError = "Passwords didn't match"
                setConfirmPasswordError(formErrors.confirmPasswordError)
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
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 3 }} />
                                <TextField error= {isErrorFirstName} helperText = {firstNameError} size="small" id="FirstName" label="First Name*" variant="outlined" onChange={(e) => handleFirstName(e)} />
                            </Box>
                        </FormControl>
                        <FormControl variant="standard">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 3, mt: 2 }} />
                                <TextField error= {isErrorLastName} helperText = {lastNameError} size="small" id="LastName" label="Last Name*" variant="outlined" onChange={(e) => handleLastName(e)}/>
                            </Box>
                        </FormControl>
                        <FormControl variant="standard">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Email sx={{ color: 'action.active', mr: 1, my: 3, mt: 2 }} />
                                <TextField error= {isErrorEmail} helperText = {emailError} size="small" id="Email" label="Email*" variant="outlined" onChange={(e) => handleEmail(e)}/>
                            </Box>
                        </FormControl>
                        <FormControl variant="standard">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Password sx={{ color: 'action.active', mr: 1, my: 3, mt: 2 }} />
                                <TextField error= {isErrorPassword} helperText = {passwordError} type="password" size="small" id="Password" label="Password*" variant="outlined" onChange={(e) => handlePassword(e)}/>
                            </Box>
                        </FormControl>
                        <FormControl variant="standard">
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Password sx={{ color: 'action.active', mr: 1, my: 3, mt: 2 }} />
                                <TextField error= {isErrorConfirmPassword} helperText = {confirmPasswordError} type="password" size="small" id="Confirm Password" label="Confirm Password*" variant="outlined" onChange={(e) => handleConfirmPassword(e)} />
                            </Box>
                        </FormControl>
                        </Box>
                    </CardContent>
                    <Box display="flex" alignItems="center" flexDirection="column">
                    <CardActions>
                        <Button type="submit" variant="contained" size="small">Sign up</Button>
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

export default RegisterPage;