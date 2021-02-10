import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import APIEndpoints from '../api';
import Sidebar from './Sidebar';
import '../styles/VocabInfo.scss';

export default function VocabInfo (props) {
    const [activeUser, setActiveUser] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [explanation, setExplanation] = useState('');
    const [owlData, setOwlData] = useState('');
    const Owlbot = require('owlbot-js');
    const client = Owlbot('cd633cb60f1e938922965049e8c62c673cb779a3');
    const { set, vocabItem } = useParams();   

    useEffect(() => {
        client.define(vocabItem).then(function(result){
           setOwlData(result);
           console.log(result)
        })
    },[activeUser]);

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
        let currentWord = currentActiveUser.data.vocab[set].find(({word}) => word === vocabItem)
        setExplanation(currentWord.explanation) 
        setUniqueId(currentActiveUser.uniqueId);
    };

    if(!owlData) {
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
                        placeholder={explanation}/>
                    </div>
                    <div className='vocab-item-owl-data'>
                        <h2>{owlData.definitions[0].type} {owlData.definitions[0].emoji}</h2>
                        <h2>{owlData.definitions[0].definition}</h2>
                        <h2>{owlData.definitions[0].example}</h2>
                        <h2>{owlData.pronunciation}</h2>
                    </div>
                </div>
            </div>
        )
    }
};