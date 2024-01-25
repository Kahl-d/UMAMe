
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RamenDiningIcon from '@mui/icons-material/RamenDining';

import './application.css';
import Navigation from './M4Components/Navigation';
import Home from './M4Components/Home';
import Add from './M4Components/Add';
import Search from './M4Components/Search';
import Mixer from './M4Components/Mixer';
import Login from './M4Components/Login';



const App=()=> {   

    return (
        <div id='appContainer'>
            
            <Router>
                <div id='topAppContainer'>
                    <div className='topSections' id='logo'> 
                    <img src='/Users/khalidkhan/Workspace/csc648-04-fall23-csc648-04-fall23-team03/Milestones/M3/src/Resources/logo.png'
                    </div>
                    
                    <div className='topSections' id='login'><AccountCircleIcon fontSize='inherit'/></div>
                </div>

                <div id='navContainer'>
                    <Navigation/>
                </div>

                <div id='mainContentContainer'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/add" element={<Add />} />
                    
                    <Route path="/search" element={<Search />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/mixer" element={<Mixer />} />
                    
                </Routes>
                </div>

            </Router>
        </div>

    );
}

export default App;



