// App.js

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Main';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import User from   './components/User'
import { useState } from 'react';
import './App.css';
import Inotebook from './components/Inotebook';
import DetailsNotes from './components/DetailsNotes';

function App() {
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const location = useLocation();

  // Function to get the background image based on the current route
  const getBackgroundImage = () => {

    // https://images.unsplash.com/photo-1467241850596-6a0de48568da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80
    // https://images.unsplash.com/photo-1493673272479-a20888bcee10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80
    const bg_auth = 'https://plus.unsplash.com/premium_photo-1685214580428-7eae1a78e7bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bG9naW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1470&q=60';
    switch (location.pathname) {
      case '/':
        return 'https://images.unsplash.com/photo-1616593772450-6220bc809944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bm90ZWJvb2slMjBwYXBlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1470&q=80';
      case '/main':
        return 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHBlbiUyMGFuZCUyMHBhcGVyfGVufDB8fDB8fHww&auto=format&fit=crop&w=1470&q=80';
      case '/about':
        return 'https://images.unsplash.com/photo-1607004468138-e7e23ea26947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWJvdXR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=1200&q=80';
      case '/login':
        return bg_auth;
      case '/signup':
        return bg_auth;
        case '/getuser':
        return 'https://plus.unsplash.com/premium_photo-1684225765349-072e1a35afc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1470&q=80';
      default:
        return 'none';
    }
  };

  return ( 
    <div className="app-container" style={{ backgroundImage: `url(${getBackgroundImage()})` }}>
      <NoteState>
        <Navbar showAlert={showAlert}/>
        <Alert alert={alert} />
        <div className='container'>
          <Routes>
            <Route path="/" element={<Inotebook/>} />
            <Route path="/main" element={<Home showAlert={showAlert} />} />
            <Route path="/about" element={<About />} />
            <Route path="/detailsnotes" element={<DetailsNotes />} />
            <Route path="/getuser" element={<User/>} />
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
          </Routes>
        </div>
      </NoteState>
    </div>
  );
}

export default App;
