import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/home.css';
import Post from './Post';


const Home = (props)=> {
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
            
            <div id='homeRecipes'>
                {data && data.length > 0 && data.map((recipe) => (
                    <div key={recipe.id}>
                    <Post setSearchUser={props.setSearchUser} recipe={recipe} />
                    <div className='seperator'  />
                    </div>
                    
                ))}
            </div>

            

        
        </div>
    );
}

export default Home;
