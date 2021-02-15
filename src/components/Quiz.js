import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import uniqid from 'uniqid';
import axios from 'axios';
import APIEndpoints from '../api';
import Sidebar from './Sidebar';
import '../styles/Quiz.scss';

export default function Quiz(props) {
    const [activeUser, setActiveUser] = useState('');
    const [answers, setAnswers] = useState([]);
    const [word, setWord] = useState('');
    const [number, setNumber] = useState(0);
    const firstTimeRender = useRef(true);
    const { profile, set } = useParams();

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
        console.log(currentActiveUser)
        setWord(currentActiveUser.data.vocab[set][0].word)
        setActiveUser(currentActiveUser)
    };

    useEffect(() => {
        if (!firstTimeRender.current) {
            generateRandomAnswers()
          }
    },[activeUser])

    const generateRandomAnswers = () => {
        let array = activeUser.data.vocab[set]
        let correctAnswer = activeUser.data.vocab[set][number].explanation
        let newAnswers = [correctAnswer];
        for(let i = 0; i <= 2;){
            let number = Math.floor(Math.random() * Math.floor(array.length))
            if(!newAnswers.includes(array[number].explanation)) {
                newAnswers.push(array[number].explanation)
                i++
            }
        }
        for (var i = newAnswers.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = newAnswers[i];
            newAnswers[i] = newAnswers[j];
            newAnswers[j] = temp;
        }
        setAnswers(newAnswers)
    }

    const skipWord = () => {
        let newNumber = Math.floor(Math.random() * Math.floor(activeUser.data.vocab[set].length))
        setNumber(newNumber);
        setWord(activeUser.data.vocab[set][number].word)
        generateRandomAnswers();
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
        <div className='quiz-page-container'>
                <Sidebar className='sidebar'></Sidebar>
                <div className='quiz-main-container'>
                    <h1>Quiz Yourself on the Words from the {set} set</h1>
                    <button onClick={skipWord}>SKIP</button>
                    <div className='quiz-container'>
                        <h2 className='quiz-word'>
                            {word}
                        </h2>
                        
                        <div className='quiz-answers'>
                            <h2>ANSWERS</h2>
                            {answers.map((answer) => (
                                <h2
                                key={uniqid}
                                >{answer}</h2>
                            ))}
                        </div>
                    </div>
                </div>
        </div>
    )
    }
}