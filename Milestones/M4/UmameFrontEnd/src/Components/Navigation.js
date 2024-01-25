import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import DinnerDiningIcon from '@mui/icons-material/DinnerDining';
import './nav.css'; 


const Navigation = ()=> {
    const navigate = useNavigate();
    const [value, setValue] = React.useState('main');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        navigate(`/${newValue}`);
        
    };

    return (
        <div id='navBar'>
            <div className='navbuttons' onClick={()=>{navigate('/main')}}>
                <DinnerDiningIcon fontSize="inherit" />
                <div className='labels'>Home</div>
                
                </div>
            <div className='navbuttons' onClick={()=>{navigate('/search')}}>
                <SearchIcon fontSize="inherit"/>
                <div className='labels'>Search</div>

                </div>
            <div className='navbuttons' onClick={()=>{navigate('/mixer')}}>
                <LocalDiningIcon fontSize="inherit"/>
                <div className='labels'>Mixer</div>
                
                </div>
            <div id='addBtn' className='navbuttons' onClick={()=>{navigate('/add')}}>
                <AddIcon fontSize="inherit"/>
                <div className='labels'>Add</div>
                
                </div>
        </div>

    );
}


export default Navigation;
