import {React, useState} from "react";
import {Routes, Route} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import Home from './Components/Home';
import './app.css';
import TuneIcon from '@mui/icons-material/Tune';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import AddIcon from '@mui/icons-material/Add';
import Add from "./Components/Add";
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Mixer from "./Components/Mixer";
import Search from "./Components/Search";
import logo from './Components/UMAMe.webp'
import Profile from "./Components/Profile";


const App = () => {

    const [homeUser, setUser] = useState(null);
    const [searchUser, setSearchUser] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();
    

    const onNavButtonClick = () => {
        const nav = document.getElementById("appNav");
        nav.style.transform = "translateX(0)";
    };

    const onCloseNavClick = () => {
        const nav = document.getElementById("appNav");
        nav.style.transform = "translateX(-100%)";
    };

    const onAddButtonClick = () => {
        navigate("/add");
        
    };

    return (
        <div id="appContainer">

            
            <div id="appHeader">
                <img src={logo} alt="UMAMe" id="logo"/>
                <div id="title">UMAMe</div>
            </div>
            {location.pathname !== "/" && (
                <Card id="appNav">
                    <div id="closeIcon" onClick={onCloseNavClick}><CloseIcon/></div>
                    <div className="navItem" onClick={
                        ()=> {
                            // if (homeUser === null) {
                            //     navigate('/');
                            // }
                            // else{
                                navigate('/sprofile');
                                onCloseNavClick();
                            // }
                            
                        }
                    }>
                        <div className="navIcon"><AccountCircleIcon/></div>
                        <div className="navText">Profile</div>
                    </div>
                    <div className="navItem" onClick={ ()=> {
                        navigate('/home');
                        onCloseNavClick();
;                        }}>
                        <div className="navIcon"><HomeIcon/></div>
                        <div className="navText">Home</div>
                    </div>
                    <div className="navItem" onClick={ ()=> {
                        navigate('/search');
                        onCloseNavClick();
;                        }}>
                        <div className="navIcon"><SearchIcon/></div>
                        <div className="navText">Search</div>
                    </div>
                    <div className="navItem" onClick={ ()=> {
                        navigate('/mixer');
                        onCloseNavClick();
;                        }}>
                        <div className="navIcon"><RestaurantMenuIcon/></div>
                        <div className="navText">Mixer</div>
                    </div>
                </Card>
            )}

            {location.pathname !== "/" && (
                <IconButton id = "appNavButton" onClick={onNavButtonClick}>
                    <TuneIcon fontSize="medium"/>
                </IconButton>
            )}
            
            {location.pathname === "/home" && (
            
            <IconButton id = "appAddButton" onClick={onAddButtonClick}>
                <AddIcon/>
            </IconButton>
            )}

            <div id="appMain">
            <Routes >
                <Route path="/" element={<LandingPage setUser={setUser} />} />
                <Route path="home" element={<Home setSearchUser={setSearchUser}  />}  />
                <Route path="add" element={<Add user={homeUser} />} />
                <Route path="search" element={<Search />} setSearchUser={setSearchUser} />
                <Route path="mixer" element={<Mixer  />} setSearchUser={setSearchUser} />
                <Route path="sprofile" element={<Profile user={homeUser} />} />
                <Route path="aprofile" element={<Profile user={searchUser} />} />
                
            </Routes>
            </div>
        </div>
    );
}

export default App;
