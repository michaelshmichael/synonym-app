import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FiTrash} from 'react-icons/fi';
import { BiPlusCircle } from 'react-icons/bi';
import axios from 'axios';
import APIEndpoints from '../api';
import Sidebar from '../components/Sidebar';
import '../styles/Vocab.scss';

export default function Vocab (props) {
    const [activeUser, setActiveUser] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [vocabSetsArray, setVocabSetsArray] = useState([]);
    const history = useHistory();
    
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
        let vocabSetsArray = Object.keys(currentActiveUser.data.vocab)
        setVocabSetsArray(vocabSetsArray)
    };

    const redirectToSet = (e) => {
        let vocabSetURL = e.target.dataset.index;
        history.push(`/profile/vocab/${vocabSetURL}`);
    }

    const deleteSet = (event) => {
        event.stopPropagation();
        let vocabSetName = event.target.dataset.index
        let updatedVocabSets = vocabSetsArray.filter(element => element !== vocabSetName);
        let obj = updatedVocabSets.reduce(function(acc, cur) {
            acc[cur] = [];
            return acc;
          }, {});
        if(window.confirm('Really Delete Set?')){
            setActiveUser((prevState) => {
                const newState = Object.assign({}, prevState);
                newState.data.vocab = obj;
                return newState;
            });
            setVocabSetsArray(updatedVocabSets)
        } else {
            return;
        }
    };

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
            setVocabSetsArray(vocabSetsArray.concat(set))
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
            <div className='sets-page-container'>
                <Sidebar className='sidebar'></Sidebar>
                <div className='sets-main-container'>
                    <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                </div>
            </div>
        )
    } else {
        return(
            <div className='sets-page-container'>
                <Sidebar className='sidebar'></Sidebar>
                <div className='sets-main-container'>
                    <div className='sets-title-container'>
                        <h1 className='sets-title'>Add Set</h1>
                        <BiPlusCircle className='bi-plus-circle' onClick={addSet}/>
                    </div>
                    <div className='sets-box-container'>
                        {vocabSetsArray.map((set) => (
                            <div
                            data-index={set}
                            className='set-box'
                            onClick={e => redirectToSet(e)}>
                                <h1 data-index={set}
                                >{set}</h1>
                                    <div className='delete-set'>
                                    <FiTrash data-index={set}  
                                    onClick={e => deleteSet(e)}
                                    />
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}