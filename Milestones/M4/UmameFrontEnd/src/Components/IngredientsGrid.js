import React from 'react';
import { Paper, Typography } from '@mui/material';
import './in.css';

const IngredientsGrid = ({ ingredients }) => {
  return (
    <div id='inContainer'>
      <Typography id="inTitle" variant="h6" sx={{ marginBottom: '10px' }}>
        Ingredients
      </Typography>
      <div className='inItems'>
        {ingredients.map((ingredient, index) => (
          <Paper className='inItem' key={index} elevation={2} sx={{ padding: '8px', margin: '5px' }}>
            <Typography variant="subtitle2" sx={{ fontSize: '0.9rem' }}>
              {ingredient.name}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.8rem' }}>
              Amount: {ingredient.amount} {ingredient.unit}
            </Typography>
          </Paper>
        ))}
      </div>
    </div>
  );
};

export default IngredientsGrid;
