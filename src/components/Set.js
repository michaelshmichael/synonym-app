import React, { useState, useEffect, useRef } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { FiTrash } from 'react-icons/fi'
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import APIEndpoints from '../api';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import '../styles/Set.scss';

toast.configure();

export default function Set (props) {
    const [activeUser, setActiveUser] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [vocabArray, setVocabArray] = useState([]);
    const [newWord, setNewWord] = useState('');
    const [explanation, setExplanation] = useState('');
    const { profile, set } = useParams();
    const firstTimeRender = useRef(true);
    const history = useHistory();
    const WORD_API_KEY = process.env.REACT_APP_WORD_API_KEY;

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
        firstTimeRender.current = false 
        const currentActiveUser = allUsers.data.find(element => element.data.username === props.user);
        setActiveUser(currentActiveUser);   
        setUniqueId(currentActiveUser.uniqueId);
        setVocabArray(currentActiveUser.data.vocab[set]);
    };

    // Sends user to specific vocab item when it is clicked.
    const redirectToVocabInfo = (e) => {
        let vocabInfoURL = e.target.dataset.index;
        history.push(`/${profile}/vocab/${set}/${vocabInfoURL}`)
    }

    // Sends user to set quiz, when quix button is clicked. Set must contain four items
    // to be redirected.
    const redirectToSetQuiz = () => {
        if(vocabArray.length >= 4) {
        history.push(`/${profile}/vocab/${set}/quiz`)
        } else {
            toast.warning('Minimum of four vocabulary items needed to launch quiz', { autoClose: 3500 })
        }
    }

    // Deletes one vocabulary item from the array. Updates activeUser state.
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

    // Creates as many definitions to insert into the word object as are provided from the API call.
    const _createDefinitionArrayFromAPIData = (APIData) => {
        let definitionArray = [];
        for(let i = 0; i <= APIData.data.results.length-1; i++){
            console.log(APIData.data.results[i])
            definitionArray.push(APIData.data.results[i].definition)
        }
        return definitionArray
    }

    // Takes the pronunciation and definition array from API call and inserts them into the word object.
    const _createNewWordObject = (APIData, definitionArray) => {
        let newWordObject = {word: newWord, 
            explanation: explanation, 
            pronunciation: APIData.data.pronunciation.all,
            definitions: definitionArray
        }
        return newWordObject
    }

    // When user clicks to submit word, this creates a new word object incorporating the word, explanation 
    // (user provided), pronunciation (API provided), and definitions (API provided). This updates
    // activeUser state and then resets the newWord and explanation state.
    async function submitNewWordAndExplanation (e) {
        e.preventDefault();
        let APIData = await wordAPICall();
        let definitionArray = _createDefinitionArrayFromAPIData(APIData);
        let newWordObject = _createNewWordObject(APIData, definitionArray);
        let updatedArray = vocabArray.concat(newWordObject);
        setActiveUser((prevState) => {
            const newState = Object.assign({}, prevState);
            newState.data.vocab[set] = updatedArray;
            return newState;
        });
        setVocabArray(updatedArray);
        setNewWord('');
        setExplanation('');
    };

    // Uses WordAPI to get data on the word submitted by user.
    async function wordAPICall () {
        try {
            const result = await axios.get(`https://wordsapiv1.p.rapidapi.com/words/${newWord}`,
                {headers: {
                    'x-rapidapi-key': WORD_API_KEY,
                    'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
                }})
                return result            
            } catch (error) {
            console.log(error)
        }
    }
    
    // Will be called when activeUser state is updated, but blocked from first time render update
    // due to useRef
    useEffect(() => {
        if (!firstTimeRender.current) {
            props.updateUser(uniqueId, activeUser);
        }
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
                    <div className='set-has-loaded'>
                        <h1 className='set-title'>Your words in the {set} set</h1>
                        <div className='word-add'>
                            <h2>Add Word</h2>
                            <input type='text'
                                placeholder='word' 
                                className='word-add-input' 
                                value={newWord} 
                                onChange={e => {setNewWord(e.target.value)}}/>
                            <input type='text'
                                placeholder='explanation' 
                                className='word-add-input' 
                                value={explanation} 
                                onChange={e => {setExplanation(e.target.value)}}/>
                            <BiPlusCircle className='bi-plus-circle' 
                                onClick={e => submitNewWordAndExplanation(e)}>
                            </BiPlusCircle>
                            <button className='uibutton' onClick={redirectToSetQuiz}>Quiz</button>
                        </div>
                        <div className='vocabulary-item-container'>
                        {vocabArray.map((item, index) => (
                            <div className='vocabulary-item'
                            key={index}>
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
                </div>
            </div>
        )
    }
}
