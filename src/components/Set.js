import React, { useState, useEffect } from 'react';
import APIEndpoints from '../api';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import '../styles/Set.scss';
//import { useParams } from 'react-router-dom';

export default function Set(props) {
    const [activeUser, setActiveUser] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    // const Owlbot = require('owlbot-js');
    // const client = Owlbot('cd633cb60f1e938922965049e8c62c673cb779a3');
    
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
        console.log(currentActiveUser)
        // let arrayFromObject = Object.keys(currentActiveUser.data.vocab)
        // setKeysArray(arrayFromObject)
        // console.log(arrayFromObject)
    };

    if(!activeUser){
        return(
            <div className='set-container'>
                <Sidebar className='sidebar'></Sidebar>
                <div className='set-main-container'>
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        )
    } else {
        return(
            <div className='set-container'>
                <Sidebar className='sidebar'></Sidebar>

                <h1>{props.user}</h1>
            </div>

        )
    }
}

 // const removeWordFromUserVocab = (word) => {
    //     let updatedAssociatedWords = activeUser.data.associatedWords.filter(element => element !== word)
    //     if(window.confirm('Really Delete Word?')){
    //         setActiveUser((prevState) => {
    //             const newState = Object.assign({}, prevState);
    //             newState.data.associatedWords = updatedAssociatedWords;
    //             return newState;
    //         });
    //     };
    // };


    // const addWordToUserVocab = () => {
    //     let word = prompt('What word do you want to add?');
    //     let associatedWords
    //     if(word === null){
    //         return;
    //     } else if(activeUser.data.associatedWords){
    //         associatedWords = [...activeUser.data.associatedWords, word]
    //     } else {
    //         associatedWords = [word]
    //     }
    //     setActiveUser((prevState) => {
    //         const newState = Object.assign({}, prevState);
    //         newState.data.associatedWords = associatedWords;
    //         return newState;
    //     });
    // }

    // const owlBot = (word) => {
    //     client.define(word).then(function(result){
    //         console.log(result)
    //         alert(result.definitions[0].example)
    //     })
    // };