// BottomNavBar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BottomNavigation, BottomNavigationAction, Paper, Zoom } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MixerIcon from '@mui/icons-material/LocalBar';

const routes = [
  { path: '/home', label: 'Home', icon: <HomeIcon /> },
  { path: '/add', label: 'Add', icon: <AddIcon /> },
  { path: '/search', label: 'Search', icon: <SearchIcon /> },
  { path: '/mixer', label: 'Mixer', icon: <MixerIcon /> },
];

const BottomNavBar = () => {
  const [value, setValue] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleClose();
  };

  return (
    <div>
      <Zoom in={isOpen}>
        <Paper
          elevation={3}
          sx={{
            position: 'fixed',
            bottom: 16,
            left: 16,
            zIndex: 1000,
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <BottomNavigation value={value} onChange={handleChange} showLabels>
            {routes.map((route, index) => (
              <BottomNavigationAction
                key={index}
                component={Link}
                to={route.path}
                label={route.label}
                icon={route.icon}
              />
            ))}
          </BottomNavigation>
        </Paper>
      </Zoom>

      <div
        onClick={handleOpen}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          zIndex: 1001,
          cursor: 'pointer',
        }}
      >
        {/* Add your custom out arrow icon */}
        <div style={{ width: 40, height: 40, backgroundColor: 'blue', borderTopLeftRadius: '10px' }} />
      </div>
    </div>
  );
};

export default BottomNavBar;
