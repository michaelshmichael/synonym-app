import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import APIEndpoints from '../api';
import '../styles/Login.scss';

export default function Login(props) {
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const redirectToProfileAfterLoggingIn = () => {
        history.push('./profile');
    };

    async function loginUser(e) {
        e.preventDefault();
        const userLogIn = {
            username,
            password
        };
        try {
            await axios.post(APIEndpoints.loginEndpoint, userLogIn, { withCredentials: true });
            props.updateSignedIn(userLogIn.username);
            redirectToProfileAfterLoggingIn();
        } catch (error) {
            alert('User or password not correct');
            console.log(error);
        }
    }

    return (
        <div className='login-form-container'>
            <form className='login-form' method='post' action='#' autoComplete='off'>
                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text"
                        className="form-control"
                        id="usernameInput"
                        value={username}
                        onChange={e => handleUsernameChange(e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password"
                        className="form-control"
                        id="passwordInput"
                        value={password}
                        onChange={e => handlePasswordChange(e)}
                    ></input>
                </div>
                <button className='btn btn-primary login-button' onClick={loginUser}>Login</button>
            </form>
        </div>
    );
}
