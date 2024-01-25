import {React, useState, useEffect} from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatIcon from '@mui/icons-material/Chat';
import BookIcon from '@mui/icons-material/Book';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import Avatar from '@mui/material/Avatar';
import CommentSection from './CommentSection';
import CookingMode from './CookingMode'; // Import CookingMode component
import axios from "axios";
import './CSS/post.css';
import InGrid from "./InGrid";
import {useNavigate} from 'react-router-dom';
import FlipIcon from '@mui/icons-material/Flip';
import DifficultyProgressBar from "./DifficultyProgressBar";



const Post = (props) => {
    const navigate = useNavigate();

    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    const [isCookingMode, setIsCookingMode] = useState(false); // State to manage Cooking Mode

    const [recipe, setRecipe] = useState({
        name: '',
        recipeOwnerName: '',
        image: '',
        ingredients: [],
        instructions: '',
        tags: [],
        dateCreated: '',
        difficulty: '',
        additionalComment: '',
        comments: [], // Assuming this is the array of comments
    });

    const [showComments, setShowComments] = useState(false);

    const toggleCookingMode = () => {
        setIsCookingMode(!isCookingMode);
    };

    useEffect(() => {
        // Assuming props.recipe is available
        const { name, recipeOwnerName, image, difficulty, ingredients, instructions, hearts, tags, dateCreated, additionalComment, comments } = props.recipe;
        setRecipe({
            name,
            recipeOwnerName,
            image,
            difficulty,
            ingredients,
            instructions,
            tags,
            hearts,
            dateCreated,
            additionalComment,
            comments,
        });
    }, [props.recipe]);

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const onAvatarClick = async () => {
        try {
            const response = await axios.post("http://3.14.254.41:5000/search", {
                searchTerm: recipe.recipeOwnerName,
                searchType: "user",
            });

            if (response) {
                console.log(response.data);
                props.setSearchUser(response.data.users[0]);
                navigate("/aprofile");
            } else {
                alert("Nothing Found!");
            }
        } catch (error) {
            console.error("Error during the search:", error);
            alert("Error during the search!");
        }
    }

    console.log(props.recipe);
    return (
        <>
        {isCookingMode && <CookingMode recipe={recipe} onClose={toggleCookingMode} />}
        <div className="post">
            <div className="postUser">
            <Avatar onClick={onAvatarClick}>{recipe.recipeOwnerName ? recipe.recipeOwnerName.charAt(0) : ''}</Avatar>
            </div>

            <div className="postContent">
                <div className="postHeader">
                    {recipe.name}
                </div>
                <div className={`flipDiv ${isFlipped ? 'flipped' : ''}`}>
                    <div className="front">
                        <img src={recipe.image} alt="recipe" />
                    </div>
                    <div className="back">
                        <InGrid ingredients={recipe.ingredients} />
                    </div>
                </div>
                <div className="flipButton" onClick={handleFlip}>
                    <FlipIcon/> FLIP
                </div>

                {recipe.difficulty && (
                    <div>
                        <DifficultyProgressBar difficulty={recipe.difficulty} />
                    </div>
                )}
                <div className="recipeCardOwner&Caption">
                    <div className="fontName">
                        @
                        {recipe.recipeOwnerName}
                    </div>
                    
                    - 
                    {recipe.additionalComment}
                </div>

                <div className="postBar">
                    <div id="likeSec">
                    <FavoriteBorderIcon className="postBarIcon"/>
                    <div>{recipe.hearts}</div>
                    </div>
                    
                    <ChatIcon className="postBarIcon" onClick={toggleComments} />
                    <BookIcon className="postBarIcon"/>
                    <FoodBankIcon className="postBarIcon" onClick={toggleCookingMode}/>
                </div>

                <div className="recipeCardTags">
                    {recipe.tags.map((tag) => (
                        <div key={tag} className="recipeCardTag">
                            #{tag}
                        </div>
                    ))}
                </div>

                <div className="commentsContainer">
                {showComments && (
                    <CommentSection className={`commentSection ${showComments ? 'expanded' : ''}`} comments={recipe.comments} />
                )}
                </div>
            </div>
        </div>
        </>
    );
}

export default Post;