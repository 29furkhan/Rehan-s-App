import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import { useState } from 'react';
import Login from './components/Login';
import axios from 'axios';

function App() {
  const core_url = "http://localhost:8080/patients"
  const [user, setUser] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('isLoggedIn') === 'true');

  const handleLogout = async () => {
    sessionStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    window.alert("Successfully Logged out!")
  }

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(core_url + '/login', {
        username,
        password,
      });

      const userData = response.data;
      if (userData.found) {
        sessionStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
        window.alert(userData.message)
      }
      else {
        sessionStorage.setItem('isLoggedIn', 'false');
        setIsLoggedIn(false);
        window.alert(userData.message)
      }
    }
    catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <>
      <Header handleLogout={handleLogout} title="वैद्य. रेहान शेख" />
      {isLoggedIn ?
        <Content core_url={core_url} /> :
        <Login onLogin={handleLogin} />
      }
    </>
  );
}

export default App;
