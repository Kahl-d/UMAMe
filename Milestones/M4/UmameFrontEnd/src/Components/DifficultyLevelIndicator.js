import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const DifficultyLevelIndicator = ({ difficultyLevel }) => {
  const calculateProgress = () => {
    // Assuming difficultyLevel ranges from 1 to 5
    return (difficultyLevel / 5) * 100;
  };

  return (
    <div id='difficultyLevelIndicatorContainer'>
      <LinearProgress
        variant="determinate"
        value={calculateProgress()}
        sx={{ height: 10, borderRadius: 5 }}
      />
      </div>
    
  );
};

export default DifficultyLevelIndicator;
