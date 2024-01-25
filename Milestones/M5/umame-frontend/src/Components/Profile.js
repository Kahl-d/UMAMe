import React, { useState } from 'react';
import { Avatar, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText, IconButton, TextField, Card, CardContent } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CookingModeIcon from '@mui/icons-material/FoodBank';
import { useLocation } from 'react-router-dom';

import CookingMode from './CookingMode';
import './CSS/Profile.css';

const Profile = ({ user }) => {
  const location = useLocation();
  const isSProfile = location.pathname === '/sprofile';

  const [isCookingMode, setIsCookingMode] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const toggleCookingMode = (recipe) => {
    setSelectedRecipe(recipe);
    setIsCookingMode(!isCookingMode);
    // Additional logic related to CookingMode activation
  };

  const handleCollectionNameChange = (e, collectionIndex) => {
    // Assuming you have a function to update the collection name in your state
    // Update the user state or dispatch an action to update the collection name
  };

  if (!user || !user.recipeCollection) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profileContainer">
      <div className="profileHeader">
        <Avatar
          style={{ width: '100px', height: '100px' }}
          alt={user.name}
          src={user.image || 'https://mui.com/static/images/avatar/1.jpg'}
        />
        <div className="profileInfo">
          <Typography variant="h4">{user.name}</Typography>
          <Typography variant="subtitle1">@{user.username}</Typography>
          <Typography variant="body2">{user.email}</Typography>
        </div>
      </div>
      <div className="Title">Recipe Playlists</div>
      <div className="recipeCollections">
        {user.recipeCollection.map((collection, index) => (
          <Accordion key={collection.name}>
            <AccordionSummary
              sx={{ backgroundColor: 'var(--color-yellow)' }}
              expandIcon={<ExpandMoreIcon />}
            >
              {isSProfile ? (
                <TextField
                  label="Collection Name"
                  value={collection.name}
                  onChange={(e) => handleCollectionNameChange(e, index)}
                />
              ) : (
                <Typography variant="h6">{collection.name}</Typography>
              )}
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {collection.recipes.map((recipe) => (
                  <ListItem key={recipe._id}>
                    <ListItemText primary={recipe.name} />
                    <IconButton onClick={() => toggleCookingMode(recipe)}>
                      <CookingModeIcon />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

     {isSProfile && (
  <div className="FeaturedRecipesContainer">
    <Typography variant="h6">Featured Recipes</Typography>
    <div className="FeaturedRecipes">
      {user.recipeCollection.map((collection) =>
        collection.recipes.slice(0, 3).map((recipe) => (
          <Card key={recipe._id} className="FeaturedRecipeCard">
            <CardContent className="FeaturedRecipeCardContent">
              <Typography variant="subtitle2">{recipe.name}</Typography>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  </div>
)}

      {isCookingMode && (
        <CookingMode recipe={selectedRecipe} onClose={() => setIsCookingMode(false)} />
      )}
    </div>
  );
};

export default Profile;
