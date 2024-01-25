import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import axios from "axios";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteIcon from '@mui/icons-material/Delete';
import RecipeCard from "./RecipeCard";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { styled } from '@mui/material/styles';
import './mixer.css';

const Mixer = () => {
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [mixers, setMixers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    const onTermChange = (event) => {
        setCurrentIngredient(event.target.value);
    }

    const handleAdd = (e) => {
        e.preventDefault(); 
        if (currentIngredient) {
            setMixers([...mixers, currentIngredient]);
            setCurrentIngredient('');
        }
    }

    const handleRemove = (index) => {
        const newMixers = mixers.filter((_, idx) => idx !== index);
        setMixers(newMixers);
    }

    const onSearchClick = async () => {
        try {
            const response = await axios.post("http://3.14.254.41:5000/search/mixer", { 
                "ingredients": mixers,
            });
            if (response.data && response.data.recipes) {
                setSearchResults(response.data.recipes);
            } else {
                alert("Nothing Found!");
                setSearchResults([]);
            }
        } catch (error) {
            console.error("There was an error during the search:", error);
            alert("Error during the search!");
            setSearchResults([]);
        }
    }

    // Custom styling
    const CompactListItem = styled(ListItem)({
        paddingTop: 4,
        paddingBottom: 4,
    });

    const MatteButton = styled(Button)({
        backgroundColor: '#f0f0f0', // Matte finish color
        color: '#333', // Text color
        '&:hover': {
            backgroundColor: '#e0e0e0', // Darker on hover
        },
        margin: '0 5px', // Spacing between buttons
    });

 

    return (
        <div id="mixer">
            <div id="mixerSearchBar">
                <TextField
                    id="searchBarTextField"
                    onChange={onTermChange}
                    value={currentIngredient}
                    placeholder="Add an ingredient..."
                    variant="outlined"
                    
                    
                />
                <div id="mixerSearchBarButtons">
                <MatteButton type="submit" variant="contained" onClick={handleAdd}>
                    <AddCircleOutlineIcon />
                </MatteButton>
                <MatteButton variant="contained" onClick={onSearchClick}>
                    <AutorenewIcon />
                </MatteButton>
                </div>
            </div>
            <div id="mixerList" >
                <List dense>
                    {mixers.map((mixer, index) => (
                        <CompactListItem key={index}>
                            <ListItemText primary={mixer} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={() => handleRemove(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </CompactListItem>
                    ))}
                </List>
            </div>
            <div id="mixerResults">
                {searchResults.map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
                <div className="gap"></div>
            </div>
        </div>
    );
}

export default Mixer;
