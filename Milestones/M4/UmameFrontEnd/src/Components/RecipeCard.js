import React, { useState } from 'react';
import './recipecard.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import KitchenIcon from '@mui/icons-material/Kitchen';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';
import IngredientsGrid from './IngredientsGrid';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import PhotoIcon from '@mui/icons-material/Photo';
import CookingMode from './CookingMode'; // Import CookingMode component

const RecipeCard = ({ recipe, profile }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isCookingMode, setIsCookingMode] = useState(false); // State to manage Cooking Mode

    const {
        name,
        recipeOwnerName,
        image,
        ingredients,
        hearts,
        comment,
        additionalComment,
    } = recipe;

    const flip = () => {
        setIsFlipped(!isFlipped);
    };

    const toggleCookingMode = () => {
        setIsCookingMode(!isCookingMode);
    };

    // Placeholder or default image URL
    const defaultImage = 'https://via.placeholder.com/200'; // Replace with your own default image URL

    return (
        <>
            {isCookingMode && <CookingMode recipe={recipe} onClose={toggleCookingMode} />}
            <Card id="recipeCardContainer">
                <div id="recipeCardLeft" style={{ display: profile === 'no' ? 'none' : 'flex' }}>
                    <Avatar>{recipeOwnerName.charAt(0)}</Avatar>
                </div>
                <CardContent id="recipeCardRight">
                    <div id="flipBox" className={`flipBox ${isFlipped ? 'flipped' : ''}`}>
                        <CardMedia
                            component="img"
                            height="200"
                            image={image || defaultImage} // Use default image if `image` is not available
                            alt={name}
                            className="front"
                        />
                        <IconButton onClick={flip} className="flipButtonFront">
                            <LocalDiningIcon />
                        </IconButton>
                        <div className="back">
                            <IngredientsGrid ingredients={ingredients} />
                            <IconButton onClick={flip} className="flipButtonBack">
                                <PhotoIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div id="postBar">
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton>
                            <CommentIcon />
                        </IconButton>
                        <IconButton>
                            <BookmarkIcon />
                        </IconButton>
                        <IconButton onClick={toggleCookingMode}>
                            <KitchenIcon />
                        </IconButton>
                    </div>
                    <Typography id="postContent" variant="body1">{additionalComment}</Typography>
                </CardContent>
            </Card>
        </>
    );
};

export default RecipeCard;
