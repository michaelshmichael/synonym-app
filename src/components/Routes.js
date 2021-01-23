import React, { useState } from 'react';
import Header from './Header';
// import { Route } from 'react-router-dom';

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
      </div>
    );
};
