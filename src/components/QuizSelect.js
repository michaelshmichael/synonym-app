import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import axios from 'axios';
import APIEndpoints from '../api';
import selection from '../svg/selection.svg';
import Sidebar from './Sidebar';
import '../styles/QuizSelect.scss';

toast.configure();

export default function QuizSelect (props) {
    const [vocabSetsArray, setVocabSetsArray] = useState([]);
    const [activeUser, setActiveUser] = useState('');
    const history = useHistory();
    const { profile } = useParams();    

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
        let vocabSetsArray = Object.keys(currentActiveUser.data.vocab)
        setActiveUser(currentActiveUser)
        setVocabSetsArray(vocabSetsArray)
    };

    const redirectToSetQuiz = (e) => {
        let set = e.target.dataset.index;
        let setData = activeUser.data.vocab[set]
        if(setData.length >= 4) {
            history.push(`/${profile}/vocab/${set}/quiz`)
        } else {
            toast.warning('Minimum of four vocabulary items needed to launch quiz', { autoClose: 3500 })
        }
    }

    return(
        <div className='quiz-select-page-container'>
            <Sidebar className='sidebar'/>
            <div className='quiz-select-container'>
                <div className='possible-sets-container'>
                    <h1>Choose Your Set</h1>
                    <div className='sets'>
                    {vocabSetsArray.map((set) => (
                        <div className='individual-set-box'
                        data-index={set}
                        onClick={e => redirectToSetQuiz(e)}>{set}</div>
                    ))}
                    </div>
                </div>
                <img src={selection} alt='person selecting an option'></img>
            </div>
        </div>
    )
}