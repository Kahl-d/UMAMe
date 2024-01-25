import React from 'react';
import { Typography, LinearProgress, Box } from '@mui/material';

const RecipeFront = ({ name, recipeOwnerName, difficulty, image }) => {
  return (
    <div className="front" style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover', height: '200px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', padding: '16px', boxSizing: 'border-box', background: 'rgba(0, 0, 0, 0.6)', color: '#fff' }}>
        <div style={{ marginBottom: '8px' }}>
          <Typography variant="h6" style={{ marginBottom: '4px', color: '#fff' }}>{name}</Typography>
          <Typography variant="subtitle2" style={{ color: '#fff' }}>@{recipeOwnerName}</Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle2" style={{ marginRight: '8px', color: '#fff' }}>Difficulty</Typography>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={difficulty} sx={{ width: '100%' }} />
          </Box>
        </div>
      </div>
    </div>
  );
};

export default RecipeFront;
