import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// index.htm main page
const root = document.getElementById('root');


  // Application MAIN ROUTER
  // App.js
ReactDOM.createRoot(root).render(

  <Router>
    <App />
  </Router>
);
