import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import SpeechToText from './Components/voicePackage/voicetotext';
import Secpage from './Components/voicePackage/voice';
import Multilingual from './Components/Multilingual';
import Crossborder from './Components/Crossborder';
import UserHistory from './Components/UserHistory';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 
     <Router>
      <Routes>
        < Route path='/' element={<Login/>}/>
        < Route path='/Register' element={<Register/>}/>
        <Route path='/Home' element = {<Home/>}/>
        <Route path='/Multilingual' element={<Multilingual/>}></Route>
        <Route path='/crossborder' element={<Crossborder/>}></Route>
        <Route path='/user_history' element={<UserHistory/>}></Route>
      

      </Routes> 
      </Router>
  



      

      
    
    
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
