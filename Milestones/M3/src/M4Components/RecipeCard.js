import React, { useState } from "react";
import './recipecard.css';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LinearProgress from '@mui/material/LinearProgress';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import CookieIcon from '@mui/icons-material/Cookie';

const RecipeCard = (props) => {
    const { recipe } = props;
    const { name, image, ingredients, recipeOwnerName, difficulty, likes, comments } = recipe;
    const [expanded, setExpanded] = useState(false);

    const handleLike = () => {
        // Implement your like logic here
    };

    const handleComment = () => {
        // Implement your comment logic here
    };

    const toggleExpand = (e) => {
        setExpanded(!expanded);

    };

    const renderDifficultyLevel = () => {
        if (difficulty) {
            return (
                <div className='difficultyLevel'>
                    <CookieIcon/>
                    <div className="diffBar">
                    <LinearProgress
                        variant="determinate"
                        value={difficulty * 20} // Assuming difficulty is an integer from 0 to 5
                    />
                    </div>
                        
                        <OutdoorGrillIcon/>
                    
                </div>
            );
        }
        return null;
    };

    return (
        <div className='recipeCardConatiner'>
        <div className={`recipeCard grid-item ${expanded ? '' : 'expanded'}`}>
            <div className='recipeContent'>
                <div className='recipeTitle'>{name}</div>
                <div className='recipeOwner'>
                    <div className='ownerTag'>@</div>
                    <div className='ownerName'>{recipeOwnerName}</div>
                </div>
            </div>
            <div className='recipeImage'>
                <img src={image} alt={name} />
            </div>
            {renderDifficultyLevel()}
            <div id="cardBtns">
                <IconButton onClick={handleLike}>
                    <FavoriteIcon style={{ color: 'red' }} />
                    {likes?.length || 0}
                </IconButton>
                <IconButton onClick={handleComment}>
                    <CommentIcon style={{ color: 'gray' }} />
                    {comments?.length || 0}
                </IconButton>
            </div>
            {expanded ? (
                <div className='recipeIngredients'>
                    <h3>Ingredients</h3>
                    <div className="ingredientList">
                        {ingredients.map((ingredient, index) => (
                            <div className="ingredient" key={index}>{ingredient.name}</div>
                        ))}
                    </div>
                </div>
            ) : null}
            <div className='expandBtn' onClick={toggleExpand}>
                {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </div>
        </div>
    </div>
    );
};

export default RecipeCard;
