import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import APIEndpoints from '../api';
import Sidebar from './Sidebar';
import QuizResults from './QuizResults';
import QuizAnswerSelect from './QuizAnswerSelect';
import '../styles/Quiz.scss';

export default function Quiz(props) {
    const [activeUser, setActiveUser] = useState('');
    const [randomAnswers, setRandomAnswers] = useState([]);
    const [word, setWord] = useState('');
    const [explanation, setExplanation] = useState('');
    const [randomWordNumber, setRandomWordNumber] = useState(0);
    const [numberCorrect, setNumberCorrect] = useState(0);
    const [wordsPassed, setWordsPassed] = useState([]);
    const [wrongGuesses, setWrongGuesses] = useState([]);
    const [visibleResults, setVisibleResults] = useState(false);
    const firstTimeRender = useRef(true);
    const firstGuess = useRef(true);
    const guessAlreadyWrong = useRef(false)
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
        firstTimeRender.current = false; 
        const currentActiveUser = allUsers.data.find(element => element.data.username === props.user);
        let wordObject = currentActiveUser.data.vocab[set][0];
        setExplanation(wordObject.explanation);
        setWord(wordObject.word);
        setActiveUser(currentActiveUser);
    };

    // Creates random answers after user data has been fetched
    useEffect(() => {
        if (!firstTimeRender.current) {
            generateRandomAnswers()
          }
    },[activeUser])

    // Inserts the correct answer in an array, then adds three more possible answers from the given set
    const generateRandomAnswers = () => {
        let array = activeUser.data.vocab[set]
        let correctAnswer = activeUser.data.vocab[set][randomWordNumber].explanation
        let newRandomAnswers = [correctAnswer];
        for(let i = 0; i <= 2;){
            let number = Math.floor(Math.random() * Math.floor(array.length))
            if(!newRandomAnswers.includes(array[number].explanation)) {
                newRandomAnswers.push(array[number].explanation)
                i++
            }
        }
        // Answers are then shuffled and state is updated.
        newRandomAnswers = durstenfeldShuffle(newRandomAnswers)
        setRandomAnswers(newRandomAnswers)
    }

    const durstenfeldShuffle = (newAnswers) => {
        for (let i = newAnswers.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = newAnswers[i];
            newAnswers[i] = newAnswers[j];
            newAnswers[j] = temp;
        }
        return newAnswers
    }

    // Function is invoked when user selects an answer.
    const selectAnswer = (e) => {
        // Answer is correct
        if(e.target.dataset.index === activeUser.data.vocab[set][randomWordNumber].explanation) {
            e.target.className = 'option-div-correct'
            if(firstGuess.current) {
                let newNumberCorrect = numberCorrect +1
                setNumberCorrect(newNumberCorrect)
            }
            setTimeout(function() {
                e.target.className = 'option-div'
                guessAlreadyWrong.current = false;
                let newWordsPassed = wordsPassed.concat(word)
                setWordsPassed(newWordsPassed) 
            }, 1000)
        // Answer is wrong
        } else {
            e.target.className = 'option-div-incorrect'
            firstGuess.current = false;
            setTimeout(function() {
                e.target.className = 'option-div'
                let wrongWordObject = {
                    word: word,
                    explanation: explanation
                }
                if(!guessAlreadyWrong.current) {
                    let newWrongGuesses = wrongGuesses.concat(wrongWordObject);
                    setWrongGuesses(newWrongGuesses)
                }
                guessAlreadyWrong.current = true;
            }, 350);
        }
    };

    // When a guess is correct, wordsPassed state is updated and this function is invoked.
    // It creates a new randomWordNumber, after checking it is not the same as the current
    // state nor has it already been called (and therefore the respective word would be in
    // the wordsPassed array).
    useEffect(() => {
        if (!firstTimeRender.current && wordsPassed.length < activeUser.data.vocab[set].length) {
            firstGuess.current = true;
            let newNumber;
            do {
                newNumber = Math.floor(Math.random() * Math.floor(activeUser.data.vocab[set].length))
            } while((newNumber === randomWordNumber) || 
                    (wordsPassed.includes(activeUser.data.vocab[set][newNumber].word)));
            setRandomWordNumber(newNumber);
        } else if (!firstTimeRender.current && wordsPassed.length === activeUser.data.vocab[set].length) {
            setVisibleResults(true);
        }
    }, [wordsPassed]);

    // After checking that the word has not been guessed already, this resets the word and its
    // explanation (its answer). This function displays the next word and regenerates random answers.
    useEffect(() => {
        if (!firstTimeRender.current) {
            setExplanation(activeUser.data.vocab[set][randomWordNumber].explanation)
            setWord(activeUser.data.vocab[set][randomWordNumber].word)
            generateRandomAnswers()
        }
    },[randomWordNumber])

    // Invoked when user clicks 'Try Again' button in QuizResults.js component.
    const tryQuizAgain = () => {
        setVisibleResults(false);
        setWord(activeUser.data.vocab[set][0].word);
        setWordsPassed([]);
        setWrongGuesses([]);
        setNumberCorrect(0);
    }

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
                    {!visibleResults &&
                        <QuizAnswerSelect
                        word={word}
                        numberCorrect={numberCorrect}
                        activeUser={activeUser}
                        set={set}
                        randomAnswers={randomAnswers}
                        selectAnswer={selectAnswer}
                        ></QuizAnswerSelect>
                    }
                    {visibleResults &&
                        <QuizResults wrongGuesses={wrongGuesses}
                        tryQuizAgain={tryQuizAgain}></QuizResults>
                    }
                </div>
                
        </div>
    )
    }
}