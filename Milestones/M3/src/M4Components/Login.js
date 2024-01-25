import {React, useState, useEffect} from "react";
import TextField from '@mui/material/TextField';
import { FormControl } from "@mui/material";
import { Button } from '@mui/material';
import axios from "axios";


const Login = () => {


    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    
    const handleSubmit = async () => {

        try {
            const response = await axios.get("http://3.14.254.41:5000/home");
            console.log(response);
        } catch (error) {
            console.error("There was an error during the search:", error);
            alert("Error during the search!");
            // setSearchResults([]);
        }

    }

    return (
        <div id="login">
            <Button id="loginBtn" onClick={handleSubmit}>  Login </Button>
        </div>


    );
}

export default Login;