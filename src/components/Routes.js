import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Registration from './Registration';
import Login from './Login';
import Home from './Home';

export default function Routes() {
    const [signedIn, setSignedIn] = useState(JSON.parse(localStorage.getItem('signedIn')) || false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || '');

    const updateSignedIn  = (username) => {
        if (signedIn === false) {
          setSignedIn(true, localStorage.setItem('signedIn', JSON.stringify(true)));
          setUser(username, localStorage.setItem('user', JSON.stringify(username)));
        } else {
          localStorage.clear();
          axios.post('https://app.yawe.dev/api/1/ce/registering-users?key=1f8d0c6bbd604833adfa5d2cf8095ef4&logout=true',
              { withCredentials: true });
        }
      };

    return (
      <div className="App">
          <Header
          signedIn={signedIn}
          user={user}
          updateSignedIn={updateSignedIn}
          ></Header>
          <Route exact path='/' render={props => <Home {...props}
                signedIn={signedIn}
            />}></Route>
          <Route path='/login' render={props => <Login {...props}
                updateSignedIn={updateSignedIn}
            />}></Route>
          <Route path='/registration' component={Registration}></Route>
      </div>
    );
};
