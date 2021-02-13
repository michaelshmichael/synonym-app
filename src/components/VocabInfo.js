import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import APIEndpoints from '../api';
import Sidebar from './Sidebar';
import WordAPI from './WordAPI'
import '../styles/VocabInfo.scss';

export default function VocabInfo (props) {
    const [activeUser, setActiveUser] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [explanation, setExplanation] = useState('');
    const { set, vocabItem } = useParams(); 

    useEffect(() => {
        async function getUserData () {
            try {
                const allUsers = await axios.get(APIEndpoints.userDataEndpoint, {withCredentials: true});
                getActiveUser(allUsers);
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
        let currentWord = currentActiveUser.data.vocab[set].find(({word}) => word === vocabItem)
        setExplanation(currentWord.explanation) 
    };

    const updateExplanation = (e) => {
        console.log(e.target.value)
        let currentWord = activeUser.data.vocab[set].find(({word}) => word === vocabItem)
        setActiveUser((prevState) => {
            const newState = Object.assign({}, prevState);
            currentWord.explanation = e.target.value;
            return newState;
        });
    };

    useEffect(() => {
        props.updateUser(uniqueId, activeUser);
    }, [activeUser])
    
    if(!activeUser) {
        return(
            <div className='vocab-item-page-container'>
                <Sidebar className='sidebar'></Sidebar>
                <div className='vocab-item-main-container'>
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        )
    } else {
        return(
            <div className='vocab-item-page-container'>
                <Sidebar className='sidebar'></Sidebar>
                <div className='vocab-item-main-container'>
                    <div className='vocab-item-user-data'>
                        <h1 className='vocab-item-word'>Word: {vocabItem}</h1>
                        <h1 className='vocab-item-definition'>Your Explanation: </h1>
                        <input className='vocab-item-definition-input' type='text' 
                        placeholder={explanation}
                        onChange={e => updateExplanation(e)}
                        />
                    </div>
                    <WordAPI
                        vocabItem={vocabItem}
                    />
                </div>
            </div>
        )
    }
};