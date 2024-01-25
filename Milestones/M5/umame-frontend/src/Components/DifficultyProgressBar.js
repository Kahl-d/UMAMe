import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const DifficultyProgressBar = ({ difficulty }) => {
  return (
    <div>
      <Typography variant="subtitle1">Difficulty: {difficulty}/5</Typography>
      <LinearProgress
        variant="determinate"
        value={(difficulty / 5) * 100} // Convert difficulty to a percentage
      />
    </div>
  );
};

export default DifficultyProgressBar;
