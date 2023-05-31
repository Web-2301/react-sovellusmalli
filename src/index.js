import React from 'react';
import ReactDOM from 'react-dom/client';
import dotenv from 'dotenv/config';
import { basename } from "./connections/yhteydet"
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
/* Huom. React.StrictMode => useEffect suoritetaan kahteen kertaan,
   vaikka sen parametrina on []! */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Router basename={basename}>
      <App />
    </Router>  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
