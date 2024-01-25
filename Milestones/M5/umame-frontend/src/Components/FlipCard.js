import React, { useState, useEffect } from 'react';
import { CardMedia, IconButton } from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import PhotoIcon from '@mui/icons-material/Photo';
import './CSS/flipCard.css';

const FlipCard = ({ image, ingredients }) => {
  const [isEmptyImage, setIsEmptyImage] = useState(image === '');
  const [isFlipped, setIsFlipped] = useState(isEmptyImage);
  const [isLoading, setIsLoading] = useState(true);

  const flip = () => {
    setIsFlipped(!isFlipped);
  };

  useEffect(() => {
    if (!image) {
      setIsFlipped(true);
    }

    setIsLoading(false);
    setIsEmptyImage(image === '');
  }, [image, ingredients]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`flipBox ${isFlipped ? 'flipped' : ''}`}>
      <div className="front">
        {isEmptyImage ? <div>No Image</div> : <CardMedia component="img" height="100%" image={image} alt="Front Image" />}
      </div>
      <div className={`back ${isFlipped ? 'flipped' : ''}`}>
        <div>BACK</div>
      </div>

      <IconButton id='flipBtn' onClick={flip} className={`flipButton`}>
        {isFlipped ? <PhotoIcon /> : <LocalDiningIcon />}
      </IconButton>
    </div>
  );
};

export default FlipCard;
