import React, { useState } from 'react';
import { IconButton, Typography, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TimerIcon from '@mui/icons-material/Timer';
import './CSS/CookingMode.css';
import Timer from './Timer';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CookingMode = ({ recipe, onClose }) => {
    const [showTimer, setShowTimer] = useState(false);

    const toggleTimer = () => {
        setShowTimer(!showTimer);
    };

   

    const NextArrow = ({ onClick }) => (
        <IconButton className="slick-arrow slick-next" onClick={onClick}>
            <Typography variant="h2" style={{ color: 'var(--color-black)' }}>›</Typography>
        </IconButton>
    );

    const PrevArrow = ({ onClick }) => (
        <IconButton className="slick-arrow slick-prev" onClick={onClick}>
            <Typography variant="h2" style={{ color: 'var(--color-black)' }}>‹</Typography>
        </IconButton>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className="cookingModeContainer" style={{ backgroundColor: 'var(--color-white)' }}>
            <IconButton className="closeButton" onClick={onClose} style={{ color: 'var(--color-black)' }}>
                <CloseIcon />
            </IconButton>
            <div className="recipeHeader">
                <Typography variant="h4" style={{ color: 'var(--color-red)', fontFamily: 'cursive' }}>
                    {recipe.name}
                </Typography>
            </div>
            <div className="compactIngredientsSection">
                <Typography variant="h6" style={{ color: 'var(--color-black)' }}>
                    Ingredients
                </Typography>
                <div className="compactIngredientsList">
                    {recipe.ingredients.map((ingredient, index) => (
                        <Typography
                            variant="body2"
                            key={index}
                            className="ingredientItem"
                            style={{ backgroundColor: 'var(--color-yellow)', color: 'var(--color-black)' }}
                        >
                            {ingredient.name}: {ingredient.amount} {ingredient.unit}
                        </Typography>
                    ))}
                </div>
            </div>
            <div className="instructionsSection">
                <Typography variant="h6" style={{ color: 'var(--color-black)' }}>
                    Instructions
                </Typography>
                <Slider {...settings}>
                    {recipe.instructions.map((instruction, index) => (
                        <Paper key={index} className="instructionCard">
                            <Typography variant="h6" style={{ color: 'var(--color-black)' }}>Step {index + 1}</Typography>
                            <Typography className="instructionText" style={{ fontSize: '1.2rem', color: 'var(--color-black)' }}>
                                {instruction.text}
                            </Typography>
                        </Paper>
                    ))}
                </Slider>
            </div>
           
            <div className="timerSection" onClick={toggleTimer} style={{ color: 'var(--color-black)', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                <IconButton>
                    <TimerIcon />
                </IconButton>
                {showTimer && <Timer />}
            </div>
        </div>
    );
};

export default CookingMode;
