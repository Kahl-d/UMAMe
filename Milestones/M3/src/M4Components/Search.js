import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import { Button } from "@mui/material";
import axios from "axios";
import RecipeCard from "./RecipeCard";
import "./search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const onTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchTerm || searchTerm.trim().length === 0) {
      alert("Please enter a valid search term!");
      return;
    }

    try {
      const response = await axios.post("http://3.14.254.41:5000/search", {
        searchTerm: searchTerm,
        searchType: "name",
      });

      if (
        response.data &&
        response.data.recipes &&
        response.data.recipes.length > 0
      ) {
        setSearchResults(response.data.recipes);
      } else {
        alert("Nothing Found!");
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error during the search:", error);
      alert("Error during the search!");
      setSearchResults([]);
    }
  };

  return (
    <div id="searchContainer">
      <div id="searchBar">
        <form id="searchBarForm" onSubmit={handleSubmit}>
          <input
            id="searchBarTextField"
            onChange={onTermChange}
            value={searchTerm}
            placeholder="What do you want to eat today?"
          />
        
        <Button id="srcBtn" onClick={handleSubmit}>
          <i className="material-icons">Search</i>
        </Button>
        </form>
      </div>
      <div id="searchResults">
        {searchResults.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default Search;
