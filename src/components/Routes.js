import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import Registration from './Registration';
import Login from './Login';
import Landing from './Landing';
import Search from './Search';
import Profile from './Profile';
import Vocab from './Vocab';
import Set from './Set';
import VocabInfo from './VocabInfo';
import APIEndpoints from '../api';
import '../html.scss'

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
          ></Header>
          <Route exact path='/' render={props => <Landing {...props}
                signedIn={signedIn}
                language={language}
                setLanguage={setLanguage}
            />}></Route>
          <Route path='/login' render={props => <Login {...props}
                updateSignedIn={updateSignedIn}
            />}></Route>
          <Route path='/registration' component={Registration}></Route>
          <Route exact path='/profile' render={props => <Profile {...props}
                user={user}
            />}></Route>
          <Route path='/profile/search' render={props => <Search {...props}
                language={language}
                setLanguage={setLanguage}
                user={user}
            />}></Route>
            <Route exact path='/profile/vocab' render={props => <Vocab {...props}
                user={user}
            />}></Route>
            <Route exact path='/profile/vocab/:set' render={props => <Set {...props}
                user={user}
            />}></Route>
            <Route exact path='/profile/vocab/:set/:vocabItem' render={props => <VocabInfo {...props}
                user={user}
            />}></Route>
          <Footer></Footer>
      </div>
    );
};
