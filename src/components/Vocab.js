import React, { useEffect, useState } from 'react';
import axios from 'axios';
import APIEndpoints from '../api';
import Sidebar from '../components/Sidebar';
import '../styles/Vocab.scss';

export default function Vocab (props) {
    const [activeUser, setActiveUser] = useState('');
    const [uniqueId, setUniqueId] = useState('');

    // These two functions are repeated from the profile page. Could be refactored I'm sure.
    useEffect(() => {
        async function getUserData () {
            try {
                const allUsers = await axios.get(APIEndpoints.userDataEndpoint, {withCredentials: true});
                getActiveUser(allUsers);
                console.log('ALL USERS')
                console.log(allUsers)
            } catch (error) {
                console.error(error);
            }
        }
        getUserData();
    },[]);

    const getActiveUser = (allUsers) => {
        const currentActiveUser = allUsers.data.find(element => element.data.username === props.user);
        setActiveUser(currentActiveUser);
        setUniqueId(currentActiveUser.uniqueId);
    };

    if(!activeUser) {
        return(
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        )
    } else {
    return(
        <div className='vocab-container'>
            <Sidebar className='sidebar'></Sidebar>
            <div className='vocab-data'>
                {activeUser.data.associatedWords.map((word) => (
                    <p>{word}</p>
                ))}
            </div>
        </div>
    )
    }
}