import React, { useState } from 'react';
import Header from './Header';
import { Route } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import Landing from './Landing';

export default function Routes() {
    const [signedIn, setSignedIn] = useState (false);
    const [user, setUser] = useState('John');

    const updateSignedIn  = () => {
        if (signedIn === false) {
            setSignedIn(true)
        } else {
            setSignedIn(false)
        }
    };


    return (
      <div className="App">
          <Header
          signedIn={signedIn}
          user={user}
          updateSignedIn={updateSignedIn}
          ></Header>
          <Route exact path='/' render={props => <Landing {...props}
                signedIn={signedIn}
            />}></Route>
          <Route path='/login' render={props => <Login {...props}
                updateSignedIn={updateSignedIn}
            />}></Route>
          <Route path='/registration' component={Registration}></Route>
      </div>
    );
};
