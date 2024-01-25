import React, { useState } from 'react';
import { IconButton, Typography, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TimerIcon from '@mui/icons-material/Timer';
import './CookingMode.css';
import Timer from './Timer';

const CookingMode = ({ recipe, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [showTimer, setShowTimer] = useState(false);

    const nextStep = () => {
        if (currentStep < recipe.instructions.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const toggleTimer = () => {
        setShowTimer(!showTimer);
    };

    return (
        <div className="cookingModeContainer">
            <IconButton className="closeButton" onClick={onClose}>
                <CloseIcon />
            </IconButton>
            <div className="recipeHeader">
                <Typography variant="h4">{recipe.name}</Typography>
            </div>
            <div className="compactIngredientsSection">
                <Typography variant="h6">Ingredients</Typography>
                <div className="compactIngredientsList">
                    {recipe.ingredients.map((ingredient, index) => (
                        <Typography variant="body2" key={index} className="ingredientItem">
                            {ingredient.name}: {ingredient.amount} {ingredient.unit}
                        </Typography>
                    ))}
                </div>
            </div>
            <div className="instructionsSection">
                <Typography variant="h6">Step {currentStep + 1} of {recipe.instructions.length}</Typography>
                <Typography className="instructionText">{recipe.instructions[currentStep].text}</Typography>
                <div className="navigationButtons">
                    <IconButton onClick={prevStep} disabled={currentStep === 0}>
                        <NavigateBeforeIcon />
                    </IconButton>
                    <IconButton onClick={nextStep} disabled={currentStep === recipe.instructions.length - 1}>
                        <NavigateNextIcon />
                    </IconButton>
                </div>
            </div>
            <div className="timerSection" onClick={toggleTimer}>
                <IconButton>
                    <TimerIcon />
                </IconButton>
                {showTimer && <Timer />}
            </div>
        </div>
    );
};

export default CookingMode;
