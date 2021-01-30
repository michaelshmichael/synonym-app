import React from 'react';
import axios from 'axios';
import APIEndpoints from '../api';

export default function ProfileData(props) {

    async function getUserData (){
        try {
            const user = await axios.get(APIEndpoints.getUser, {withCredentials: true});
            console.log(user.data.data.username);
        } catch (error) {
            console.error(error);
        }
    }
    return(
        <div className='profile-data'>
            <h1 className='profile-name' onClick={getUserData}>{props.user}</h1>
            <form>
                <input type='text' placeholder='What language are you learning?'></input>
            </form>
        </div>
    )
};

