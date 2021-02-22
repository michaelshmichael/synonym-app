import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import APIEndpoints from '../api';
import Sidebar from './Sidebar';
import '../styles/VocabInfo.scss';

export default function VocabInfo (props) {
    const [activeUser, setActiveUser] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [wordObject, setWordObject] = useState('');
    const [definitionNumber, setDefinitionNumber] = useState(0);
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
        setWordObject(currentWord);
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

    const updateExample = (e) => {
        console.log(e.target.value)
        let currentWord = activeUser.data.vocab[set].find(({word}) => word === vocabItem)
        setActiveUser((prevState) => {
            const newState = Object.assign({}, prevState);
            currentWord.example = e.target.value;
            return newState;
        });
    }

    const displayNextDefinition = (e) => {
        let newDefinitionNumber;
        switch(e.target.dataset.index){
        case 'next': 
            newDefinitionNumber = definitionNumber +1
            if (newDefinitionNumber === wordObject.definitions.length) {newDefinitionNumber = 0}
            setDefinitionNumber(newDefinitionNumber)
            break;
        case 'previous':
            newDefinitionNumber = definitionNumber -1
            if (newDefinitionNumber === -1) {newDefinitionNumber = wordObject.definitions.length-1}
            setDefinitionNumber(newDefinitionNumber)
            break;
        default: 
            break;
        }
    }

    const removeCurrentDefinition = (e) => {
        if(window.confirm('Delete')) {
            let updatedDefinitions1 = wordObject.definitions.slice(0, definitionNumber)
            let updatedDefinitions2 = wordObject.definitions.slice(definitionNumber+1)
            let newDefinitions = [...updatedDefinitions1, ...updatedDefinitions2]
            let currentWord = activeUser.data.vocab[set].find(({word}) => word === vocabItem)
            setActiveUser((prevState) => {
                const newState = Object.assign({}, prevState);
                currentWord.definitions = newDefinitions
                return newState;
            });
        }
    }

    useEffect(() => {
        props.updateUser(uniqueId, activeUser);
    }, [activeUser])
    
    if(!wordObject) {
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
                        placeholder={wordObject.explanation}
                        onChange={e => updateExplanation(e)}
                        />
                    </div>
                    
                    <div className='vocab-item-api-data'>
                        <h3>Pronunciation</h3>
                            <h3>{wordObject.pronunciation}</h3>
                        <h3>Definition</h3>
                        <button data-index='previous' onClick={e => displayNextDefinition(e)}>Previous</button>
                        <button data-index='next' onClick={e => displayNextDefinition(e)}>Next</button>
                        
                            <h3>{wordObject.definitions[definitionNumber]}</h3>
                        <button data-index={vocabItem} onClick={removeCurrentDefinition}>Delete</button>
                    </div>
                    <div className='vocab-item-example'>
                        <h2>Example Sentence</h2>
                            <input type='text'
                            placeholder={wordObject.example}
                            onChange={e => updateExample(e)}
                            />
                    </div>
                </div>
            </div>
        )
    }
};