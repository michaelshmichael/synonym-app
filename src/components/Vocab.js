import React, { useEffect, useState } from 'react';
import { FiTrash} from 'react-icons/fi';
import { BiPlusCircle } from 'react-icons/bi';
import axios from 'axios';
import APIEndpoints from '../api';
import Sidebar from '../components/Sidebar';
import '../styles/Vocab.scss';

const Owlbot = require('owlbot-js');
const client = Owlbot('cd633cb60f1e938922965049e8c62c673cb779a3');

export default function Vocab (props) {
    const [activeUser, setActiveUser] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [keysArray, setKeysArray] = useState([]);
    
    // These two functions are repeated from the profile page. Could be refactored I'm sure.
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
        let arrayFromObject = Object.keys(currentActiveUser.data.vocab)
        setKeysArray(arrayFromObject)
        console.log(arrayFromObject)
    };

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

    const deleteSet = (set) => {
        let setName = set.target.dataset.index
        console.log(setName)
        let updatedSets = keysArray.filter(element => element !== setName);
        console.log(updatedSets)
        var obj = updatedSets.reduce(function(acc, cur, i) {
            acc[cur] = [];
            return acc;
          }, {});
        console.log(obj)
        if(window.confirm('Really Delete Word?')){
            setActiveUser((prevState) => {
                const newState = Object.assign({}, prevState);
                newState.data.vocab = obj;
                return newState;
            });
            setKeysArray(updatedSets)
        };
    };

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

    const addSet = () => {
        let set = prompt('What is the name of your set?');
        if(set === null){
            return;
        } else {
            setActiveUser((prevState) => {
                const newState = Object.assign({}, prevState);
                newState.data.vocab[set] = [];
                return newState;
            });
            setKeysArray(keysArray.concat(set))
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

    if(!activeUser) {
        return(
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        )
    } else {
        return(
            <div className='set-container'>
                <Sidebar className='sidebar'></Sidebar>
                <div className='set-main-container'>
                    <div className='set-title'>
                        <h1>Add Set</h1>
                        <BiPlusCircle className='bi-plus-circle' onClick={addSet}/>
                    </div>
                    <div className='set-box-container'>
                        {keysArray.map((set) => (
                            <div
                            data-index={set}
                            className='set-box'>
                                <h1>{set}</h1>
                                <FiTrash data-index={set} onClick={e => deleteSet(e)}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}