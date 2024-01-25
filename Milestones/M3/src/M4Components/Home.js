import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeCard from './RecipeCard';
import '../application.css';

function Home() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://3.14.254.41:5000/home');
                setData(response.data.recipes);
                console.log(response.data.recipes);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div id='homeContainer'>
            {data && data.length > 0 && data.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}

        
        </div>
    );
}

export default Home;
