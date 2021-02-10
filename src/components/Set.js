import React, { useState, useEffect } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { FiTrash } from 'react-icons/fi'
import { useParams, useHistory } from 'react-router-dom';
import APIEndpoints from '../api';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import '../styles/Set.scss';


export default function Set (props) {
    const [activeUser, setActiveUser] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [vocabArray, setVocabArray] = useState([]);
    const [inputFormDisplay, setInputFormDisplay] = useState('word-input-hidden');
    const [newWord, setNewWord] = useState('');
    const [explanation, setExplanation] = useState('');

    const { set } = useParams();
    const history = useHistory();
    
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
        setVocabArray(currentActiveUser.data.vocab[set]);
    };

    const redirectToVocabInfo = (e) => {
        let vocabInfoURL = e.target.dataset.index;
        history.push(`/profile/vocab/${set}/${vocabInfoURL}`)
    }

    const deleteItem = (e) => {
        e.stopPropagation();
        let updatedArray = vocabArray.filter(element => element.word !== e.target.dataset.index)
        if(window.confirm('Really Delete Word?')){
            setActiveUser((prevState) => {
                const newState = Object.assign({}, prevState);
                newState.data.vocab[set] = updatedArray;
                return newState;
            });
            setVocabArray(updatedArray)
        }
    }

    const toggleInputFormDisplay = () => {
        inputFormDisplay === 'word-input-hidden' ? 
        setInputFormDisplay('word-input-display') : 
        setInputFormDisplay('word-input-hidden')
    };

    const submitNewWordAndExplanation = (e) => {
        e.preventDefault();
        let newWordObject = {word: newWord, explanation: explanation}
        let updatedArray = vocabArray.concat(newWordObject);
        setActiveUser((prevState) => {
            const newState = Object.assign({}, prevState);
            newState.data.vocab[set] = updatedArray;
            return newState;
        });
        setVocabArray(updatedArray);
        setNewWord('');
        setExplanation('');
        toggleInputFormDisplay();
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
                <div className='set-main-container'>
                    <div className='set-title'>
                        <h1>Add Word to {set}</h1>
                        <BiPlusCircle className='bi-plus-circle' 
                        onClick={toggleInputFormDisplay}>
                        </BiPlusCircle>
                    </div>
                    <div className='vocabulary-item-container'>
                    {vocabArray.map((item) => (
                        <div className='vocabulary-item'>
                            <div className='vocab-front-word'>
                                <h2>{item.word}</h2>
                            </div>
                            <div className='vocab-back-explanation'
                            data-index={item.word}
                            onClick={e => redirectToVocabInfo(e)}>
                                <h2 data-index={item.word}>{item.explanation}</h2>
                                <FiTrash data-index={item.word} onClick={e => deleteItem(e)}/>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className={inputFormDisplay}>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='word'>Word</label>
                            <input id='word' type='text' value={newWord} 
                            onChange={e => setNewWord(e.target.value)}></input>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='translation'>Translation / Explanation</label>
                            <input id='translation' type='text' value={explanation} 
                            onChange={e => setExplanation(e.target.value)}></input>
                        </div>
                        <button onClick={e => submitNewWordAndExplanation(e)}>Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}
