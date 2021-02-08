import React, { useState, useEffect } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { FiTrash } from 'react-icons/fi'
import { useParams } from 'react-router-dom';
import APIEndpoints from '../api';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import '../styles/Set.scss';


export default function Set (props) {
    const [activeUser, setActiveUser] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [vocabArray, setVocabArray] = useState([]);
    const { set } = useParams();

    // const Owlbot = require('owlbot-js');
    // const client = Owlbot('cd633cb60f1e938922965049e8c62c673cb779a3');
    
    useEffect(() => {
        async function getUserData () {
            try {
                const allUsers = await axios.get(APIEndpoints.userDataEndpoint, {withCredentials: true});
                getActiveUser(allUsers);
                console.log('ad')
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

    const deleteItem = (e) => {
        let updatedArray = vocabArray.filter(element => element !== e.target.dataset.index)
        console.log(updatedArray)
        if(window.confirm('Really Delete Word?')){
            setActiveUser((prevState) => {
                const newState = Object.assign({}, prevState);
                newState.data.vocab[set] = updatedArray;
                return newState;
            });
            setVocabArray(updatedArray)
        }
    }

    const addItem = () => {
        let item = prompt(`What word do you want to add to ${set}?`);
        let updatedArray = vocabArray.concat(item);
        if(item === null){
            return;
        } else {
            setActiveUser((prevState) => {
                const newState = Object.assign({}, prevState);
                newState.data.vocab[set] = updatedArray;
                return newState;
            });
            setVocabArray(updatedArray);
        }
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
                        <h1>Add Word</h1>
                        <BiPlusCircle className='bi-plus-circle' onClick={addItem}></BiPlusCircle>
                    </div>
                        <div className='vocabulary-item-container'>
                        {vocabArray.map((item) => (
                            <div className='vocabulary-item'>
                                <h2>
                                    {item}
                                </h2>
                                <FiTrash data-index={item} onClick={e => deleteItem(e)}/>
                            </div>
                        ))}
                        </div>
                    </div>
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