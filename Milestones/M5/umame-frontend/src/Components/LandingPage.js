import {React, useState, useEffect} from "react";
import './CSS/landingPage.css';
// import Button from '@mui/material/Button';
import Face2Icon from '@mui/icons-material/Face2';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import axios from 'axios';




const LandingPage = (props) => {
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');

    const [user, setUser] = useState(null);


    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://3.14.254.41:5000/login", {
          "username": email,
          "password": password
      });
    
        if (response) { // Check if response.data is defined
          console.log(response);
          props.setUser(response.data.user);
          navigate("/home");
        } else {
          alert("Invalid Email or password!");
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        console.error("There was an error logging in:", error);
        alert("Invalid username or password!");
        setEmail("");
        setPassword("");
      }
    };
    
  
  
    /**
       * Handles the signup process.
       * Implement your logic for signing up here.
       *
       * @param {Object} event - The event object from the form submission.
       */
  
    const handleSignup = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post("http://3.14.254.41:5000/signup", {
          name: name,
          username: userName,
          email: email,
          password: password,
        });
    
        if (response.data) {
          console.log(response);
          alert("Signup successful!");
          
          // Reload the page after successful signup
          window.location.reload();
          // props.setUser(response.data);
          navigate("/");

          
        } else {
          alert("Invalid Email or password!");
          setEmail("");
          setPassword("");
          setName("");
          setUserName("");
        }
      } catch (error) {
        console.error("There was an error signing up:", error);
        alert("Error during signup. Check console for details.");
        setEmail("");
        setPassword("");
        setName("");
        setUserName("");
      }
    };
    



    return(

        <div id="landingPageContainer">
  
            {/* onClick={() => setShowLogin(true)}   */}
            <div id="landingPageContent">
            {showLogin ? (
                    <form id="loginForm" onSubmit={handleLogin}>
                      <div className="log">Login</div>
                      <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <form id="submitForm" onSubmit={handleSignup}>
                      <div className="log">Welcome</div>

                      <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        variant="outlined"
                        placeholder="User Name"
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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


                <div id="allButtonContainer">
                    <div id="loginButtonContainer">
                        <div className="squareButtonStyle" onClick={()=> setShowLogin(true)}>
                          <LoginIcon fontSize="large" />
                            <div>Login</div>
                        </div>
                        <div className="squareButtonStyle" onClick={()=> setShowSignup(true)}>
                            <AppRegistrationIcon/>
                            <div>SignUp</div>
                        </div>
                    </div>
                    <div className="smallButtonStyle" onClick={()=> navigate("home")}>
                        <ExitToAppIcon fontSize="large" />
                        <div> Continue as Guest</div>
                    </div>

                </div>

                )}

            </div>
            
                
                
            </div>


    );
}

export default LandingPage;