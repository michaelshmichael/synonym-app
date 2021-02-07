import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
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

    const removeWordFromUserVocab = (word) => {
        let updatedAssociatedWords = activeUser.data.associatedWords.filter(element => element !== word)
        if(window.confirm('Really Delete Word?')){
            setActiveUser((prevState) => {
                const newState = Object.assign({}, prevState);
                newState.data.associatedWords = updatedAssociatedWords;
                return newState;
            });
        };
    };

    useEffect(() => {
        if(uniqueId){
            async function updateUserLanguage() {
                console.log('LANGUAGE CHANGED')
                console.log(activeUser)
                try {
                    const updatedUser = await axios.put(`https://app.yawe.dev/api/1/ce/non-auth-endpoint?key=b0188b53ea77419ba1d6dcda06e4bea9&uniqueId=${uniqueId}`, 
                    activeUser.data,
                    { withCredentials: true },
                    { headers: {'Content-Type': 'application/json'}}
                    )
                    console.log('UPDATED USER')
                    console.log(updatedUser.data)
                } catch (error) {
                    console.log(error)
                }
            }
            updateUserLanguage();
        };
    }, [activeUser])

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
                    <div className='vocab-data-word'>
                        <h1>{word}</h1>
                        <FaTrashAlt
                        onClick={e => removeWordFromUserVocab(word)}/>
                    </div>
                ))}
            </div>
        </div>
    )
    }
}