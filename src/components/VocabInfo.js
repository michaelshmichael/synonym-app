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
    const [APIdefinition, setAPIDefinition] = useState('');
    const [APIexample, setAPIExample] = useState('');
    const [APIpronunciation, setAPIPronunciation] = useState('');
    const { set, vocabItem } = useParams(); 

    useEffect(() => {
        async function WordAPICall () {
            try {
                const result = await axios.get(`https://wordsapiv1.p.rapidapi.com/words/${vocabItem}`,
                    {headers: {
                        'x-rapidapi-key': 'f74c925871msh70f9c315d6fed91p101f0cjsn861ef3bc1f60',
                        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
                    }})
                    setAPIPronunciation(result.data.pronunciation.all);
                    setAPIDefinition(result.data.results[0].definition);
                    setAPIExample(result.data.results[0].examples[0]);
                    console.log(result)                
                } catch (error) {
                console.log(error)
            }
        }
        WordAPICall();
    },[]);

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
        console.log(currentActiveUser)
        let currentWord = currentActiveUser.data.vocab[set].find(({word}) => word === vocabItem)
        setExplanation(currentWord.explanation) 
        setUniqueId(currentActiveUser.uniqueId);
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
        if(uniqueId){
            async function updateUser() {
                try {
                    const updatedUser = await axios.put(`https://app.yawe.dev/api/1/ce/non-auth-endpoint?key=b0188b53ea77419ba1d6dcda06e4bea9&uniqueId=${uniqueId}`, 
                    activeUser.data,
                    { withCredentials: true },
                    { headers: {'Content-Type': 'application/json'}}
                    )
                    console.log(updatedUser)
                } catch (error) {
                    console.log(error)
                }
            }
            updateUser();
        };
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
                    <div className='vocab-item-api-data'>
                    <h3>Pronunciation</h3>
                        <h2>{APIpronunciation}</h2>
                    <h3>Definition</h3>
                        <h2>{APIdefinition}</h2>
                    <h3>Example</h3>
                        <h2>{APIexample}</h2>
                    </div>
                </div>
            </div>
        )
    }
};