import React, { useState } from "react";
import './landingpage.css';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const LandingPage = () => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const asGuest = () => {
        navigate("/main");
    };

    const handleLogin = (event) => {
        event.preventDefault();
        // Add your login logic here
    };

    const handleSignup = (event) => {
        event.preventDefault();
        // Add your signup logic here
    };

    const squareButtonStyle = {
        minWidth: '150px',
        minHeight: '150px',
        margin: '10px',
        borderRadius: '10px',
        backgroundColor: '#f0f0f0', // Matte finish color
        color: '#333', // Text color
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' // subtle shadow for depth
    };

    return (
        <div id="landingPageContainer">
            <div id="welcomeText">
                <h1>Welcome</h1>
            </div>
            <div id="landingPageContent">
                {showLogin ? (
                    <form onSubmit={handleLogin}>
                        <TextField
                            variant="outlined"
                            placeholder="Email"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            placeholder="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button variant="contained" fullWidth type="submit">
                            Login
                        </Button>
                    </form>
                ) : showSignup ? (
                    <form onSubmit={handleSignup}>
                        <TextField
                            variant="outlined"
                            placeholder="Name"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            placeholder="Email"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            variant="outlined"
                            placeholder="Password"
                            type="password"
                            fullWidth
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button variant="contained" fullWidth type="submit">
                            Signup
                        </Button>
                    </form>
                ) : (
                    <div id="buttonBase" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button style={squareButtonStyle} onClick={() => setShowLogin(true)}>
                            <LoginIcon fontSize="large" />
                            <div>Login</div>
                        </Button>
                        <Button style={squareButtonStyle} onClick={() => setShowSignup(true)}>
                            <AppRegistrationIcon fontSize="large" />
                            <div>Signup</div>
                        </Button>
                        <Button style={squareButtonStyle} onClick={asGuest}>
                            <ExitToAppIcon fontSize="large" />
                            <div>Guest</div>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LandingPage;
