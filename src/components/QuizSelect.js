import React, { useEffect, useState } from 'react';
import axios from 'axios';
import APIEndpoints from '../api';
import selection from '../svg/selection.svg';
import Sidebar from './Sidebar';
import '../styles/QuizSelect.scss';

export default function QuizSelect (props) {
    const [activeUser, setActiveUser] = useState('');
    const [vocabSetsArray, setVocabSetsArray] = useState([]);

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
        setActiveUser(currentActiveUser)
        let vocabSetsArray = Object.keys(currentActiveUser.data.vocab)
        setVocabSetsArray(vocabSetsArray)
    };

    if(!vocabSetsArray){
        return(
            <div className='quiz-select-page-container'>
                <Sidebar className='sidebar'></Sidebar>
                <div className='quiz-select-container'>
                    <div className='possible-sets-container'>
                        <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </div>
                    <img src={selection} alt='person selecting an option'></img>
                </div>
            </div>
        )
    } else {
        return(
            <div className='quiz-select-page-container'>
                <Sidebar className='sidebar'/>
                <div className='quiz-select-container'>
                    <div className='possible-sets-container'>
                        <h1>Choose Your Set</h1>
                        {vocabSetsArray.map((set) => (
                            <h2>{set}</h2>
                        ))}
                    </div>
                    <img src={selection} alt='person selecting an option'></img>
                </div>
            </div>
        )
    }
}