import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Registration from './Registration';
import Login from './Login';
import Home from './Home';
import APIEndpoints from '../api';


export default function Routes() {
    const [signedIn, setSignedIn] = useState(JSON.parse(localStorage.getItem('signedIn')) || false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || '');
    const [language, setLanguage] = useState('en')

    const updateSignedIn  = (username) => {
        if (signedIn === false) {
          setSignedIn(true, localStorage.setItem('signedIn', JSON.stringify(true)));
          setUser(username, localStorage.setItem('user', JSON.stringify(username)));
        } else {
          localStorage.clear();
          axios.post(APIEndpoints.logoutEndpoint, { withCredentials: true });
        }
      };

    return (
      <div className="App">
          <Header
          signedIn={signedIn}
          user={user}
          updateSignedIn={updateSignedIn}
          setLanguage={setLanguage}
          ></Header>
          <Route exact path='/' render={props => <Home {...props}
                signedIn={signedIn}
                language={language}
            />}></Route>
          <Route path='/login' render={props => <Login {...props}
                updateSignedIn={updateSignedIn}
            />}></Route>
          <Route path='/registration' component={Registration}></Route>
      </div>
    );
};
