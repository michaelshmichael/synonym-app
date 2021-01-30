import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import APIEndpoints from '../api';
import joiningSVG from '../svg/joining.svg';
import '../styles/Registration.scss';

export default function Registration() {
    const history = useHistory();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // const [nativeLanguage, setNativeLanguage] = useState('');
    const [email, setEmail] = useState('');

    const handleChanges = (formItemBeingUpdated, e) => {
        switch (formItemBeingUpdated) {
        case 'firstName':
            setFirstName(e.target.value);
            break;
        case 'lastName':
            setLastName(e.target.value);
            break;
        case 'username':
            setUsername(e.target.value);
            break;
        case 'password':
            setPassword(e.target.value);
            break;
        // case 'nativeLangauge':
        //     setNativeLanguage(e.options[e.selectedIndex].value);
        //     break;
        case 'email':
            setEmail(e.target.value);
            break;
        default:
        // do nothing
        }
    };

    const redirectToLoginPageAfterRegistering = () => {
        history.push('./login');
    };

    async function registerUser(e) {
        e.preventDefault();
        const usernameAndPassword = {
            username,
            password,
            //nativeLanguage
        };
        try {
            const registeredUser = await axios.post(APIEndpoints.userEndpoint, usernameAndPassword);
            console.log(registeredUser.data.data);
            redirectToLoginPageAfterRegistering();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='registration-page-container'>
        <div className='registration-form-container'>
            <form method='post' action='#' autoComplete='off' className='registration-form'>
                <div className="form-group">
                    <label htmlFor="firstNameInput">First Name </label>
                    <input type="text"
                        className="form-control"
                        id="firstNameInput"
                        value={firstName}
                        onChange={e => handleChanges('firstName', e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="lastNameInput">Last Name </label>
                    <input type="text"
                        className="form-control"
                        id="lastNameInput"
                        value={lastName}
                        onChange={e => handleChanges('lastName', e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="lastNameInput">Username </label>
                    <input type="text"
                        className="form-control"
                        id="usernameInput"
                        value={username}
                        onChange={e => handleChanges('username', e)}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password </label>
                    <input type="password"
                        className="form-control"
                        id="passwordInput"
                        value={password}
                        onChange={e => handleChanges('password', e)}
                    ></input>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="nativeLanguage">Native Language </label>
                    <select onClick={e => handleChanges('nativeLanguage', e)} 
                    id="nativeLanguage" 
                    name="nativeLanguage">
                        <option value="english">English</option>
                        <option value="russian">Russian</option>
                        <option value="portuguese">Portuguese</option>
                        <option value="spanish">Spanish</option>
                    </select>
                </div> */}
                <div className="form-group">
                    <label htmlFor="emailInput">Email </label>
                    <input type="email"
                        className="form-control"
                        id="emailInput"
                        value={email}
                        onChange={e => handleChanges('email', e)}
                    ></input>
                </div>
                <button className='btn btn-primary registration-button' onClick={registerUser}>Register</button>
            </form>
        </div>
        <img className='joiningSVG' src={joiningSVG} alt='join-us!'></img>
        </div>
    );
}
