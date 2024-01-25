import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Main from './Components/Main';
import Add from './Components/Add';
import Search from './Components/Search';
import Mixer from './Components/Mixer';
import LandingPage from './Components/LandingPage';
import Navigation from './Components/Navigation';

import './app.css';

const App = () => {

    const location = useLocation();
    const [path, setPath] = useState(location.pathname);
  
    useEffect(() => {
      const handleLocationChange = () => {
        setPath(location.pathname);
      };
  
      window.removeEventListener('popstate', handleLocationChange); // Remove existing event listener
      window.addEventListener('popstate', handleLocationChange); // Add new event listener
  
      // Set the initial path
      setPath(location.pathname);

      
  
      return () => {
        window.removeEventListener('popstate', handleLocationChange);
      };
    }, [location]); // Update dependency array to include 'location'

  

  return (
    <div id='appContainer' style={{ backgroundColor: path === '/' ? '#F5B041' : '#F7F9F9', color: path === '/' ? '#1C2833' : '#F7F9F9' }}>
        <div id="logo">UMAMe</div>
        <div id="gloveIcon">
            <svg className="holo" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 2000 2000" viewBox="0 0 2000 2000" id="cooking-gloves"><path fill="#762426" d="M1346.072998,728.5527344c-76.4882813-205.9309692-167.2659912-276.5362854-208.4525146-260.5661316
                c-41.1861572,15.9701233-86.5749512,76.4891663-69.7645264,180.7154846c0,0,11.7679443,38.6644897-16.8104248,48.7511597
                c-28.5783691,10.0862427-112.6317749-73.9676514-137.8477173-99.1831055
                c-25.2159424-25.2164917-221.06073-224.4231262-400.0945435-48.7512207
                c-179.0342712,175.6713867-56.3158569,368.9946289,91.618042,525.3344727
                c147.9343872,156.3388672,554.7531738,507.6827393,554.7531738,507.6827393l462.2943115-462.2939453
                C1621.7687988,1120.2421875,1422.5621338,934.4836426,1346.072998,728.5527344z"></path><rect width="653.783" height="61.812" x="1085.584" y="1342.337" fill="#fe3a24" transform="rotate(-45 1412.476 1373.243)"></rect></svg>
            </div>

        <div id="topShelfKnives">
                <svg className="holo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.52 204.23" id="knife"><g data-name="Layer 2"><g><path fill="none" stroke="#f7941d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M4 95.94V78.28M25.26 78.28h20.07c.44 4.37.77 8.77 1 13.2q.23 5.26.23 10.58a235.82 235.82 0 01-21.26 98.16A21.26 21.26 0 014 179v-65.39"></path><path fill="none" stroke="#ed1c24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M25.26 14.63a10.63 10.63 0 1 0-21.26 0v72.48l21.26-8.83z"></path></g></g></svg>
                <svg className="holo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.78 204.23" id="knife"><g data-name="Layer 2"><g><circle cx="18.52" cy="185.71" r="4" fill="#f7941d"></circle><path fill="none" stroke="#ed1c24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M46.91 187.28a375.16 375.16 0 0 0 3.06-48 375.13 375.13 0 0 0-3.07-48.17"></path><path fill="none" stroke="#f7941d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M4 95.94V78.28M4 113.61v74.53a12.09 12.09 0 0012.09 12.09h43.39a227 227 0 008.3-61 227 227 0 00-8.3-61H25.26"></path><path fill="none" stroke="#ed1c24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M25.26 14.63a10.63 10.63 0 0 0-21.26 0v70.68l21.26-7z"></path></g></g></svg>
                <svg className="holo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50.52 204.23" id="mixer"><g data-name="Layer 2"><g><path fill="none" stroke="#f7941d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M46.52 179A21.26 21.26 0 0 1 4 179c0-6.77 21.26-90.06 21.26-90.06S46.52 167.23 46.52 179z"></path><path fill="none" stroke="#f7941d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M16.62 157.57c3-27.11 8.64-68.66 8.64-68.66S35.81 167.23 35.81 179s-4.72 21.26-10.55 21.26-10.55-9.55-10.55-21.26"></path><path fill="none" stroke="#ed1c24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M35.89 14.63a10.63 10.63 0 0 0-21.26 0v63.65a10.63 10.63 0 0 0 21.26 0z"></path></g></g></svg>
                <svg className="holo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 71.33 204.23" id="spatula"><g data-name="Layer 2"><g><path fill="none" stroke="#f7941d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M35.67 133.19h15.48a12.22 12.22 0 0 1 12.16 11.08l4 42.6a12.22 12.22 0 0 1-12.16 13.35H16.22a12.22 12.22 0 0 1-12.17-13.34l4-42.6a12.22 12.22 0 0 1 12.16-11.08"></path><path fill="none" stroke="#ed1c24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M21.14 152.9v29.84M35.67 152.9v29.84M50.19 152.9v29.84"></path><path fill="none" stroke="#f7941d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M35.67 133.19V88.91"></path><path fill="none" stroke="#ed1c24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M46.3 14.63a10.63 10.63 0 0 0-21.26 0v63.65a10.63 10.63 0 0 0 21.26 0z"></path></g></g></svg>

            </div>
            <div id="sauceBottles">
                <svg className="holo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149.73 178.08" id="ketchup-bottle"><g data-name="Layer 2"><g><path fill="none" stroke="#ed1c24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M11.09 66.6H4v107.48h42.52V66.6H28.75"></path><path fill="none" stroke="#ed1c24" strokeLinejoin="round" strokeWidth="8" d="M11.09 66.6V52.43h28.34V66.6"></path><path fill="none" stroke="#ed1c24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M31.6 52.43 27.45 4h-4.77l-3.76 48.43"></path><path fill="none" stroke="#f7941d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M110.3 66.6h-7.09v107.48h42.52V66.6h-17.77"></path><path fill="none" stroke="#f7941d" strokeLinejoin="round" strokeWidth="8" d="M110.3 66.6V52.43h28.35V66.6"></path><path fill="none" stroke="#f7941d" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" d="M130.81 52.43 126.66 4h-4.77l-3.76 48.43"></path></g></g></svg>
            </div>



      {path !== '/' && (
        <div id='navContainer'>
          <Navigation />
        </div>
      )}
      <div id="appmain">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/add" element={<Add />} />
        <Route path="/search" element={<Search  />} />
        <Route path="/mixer" element={<Mixer />} />
      </Routes>
      </div>
      
    </div>
  );
};

export default App;
