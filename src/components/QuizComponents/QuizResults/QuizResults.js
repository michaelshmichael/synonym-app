import React from 'react';
import celebration from '../../../svg/celebration.svg';

export default function QuizResults ({wrongGuesses, tryQuizAgain, reviseSet}) {
    if(wrongGuesses.length === 0) {
        return(
            <div className='quiz-results-container-success'>
                <div className='quiz-success-message-and-buttons'>
                    <h2 className='quiz-success-message'>Well done! You got all the questions right!</h2>
                    <div className='quiz-success-buttons'>
                        <button></button>
                        <button></button>
                    </div>
                </div>
                <img className='quiz-success-image' src={celebration} alt={'people-celebrating'}></img>
            </div>
        )
    } else {
        return(
            <div className='quiz-results-container'>
                <h1 className='quiz-results-header'>Wrong Guesses</h1>
                <div className='quiz-results-card-container'>
                {wrongGuesses.map((guess) => (
                    <div className='quiz-results-item-card'>
                        <h2>{guess.word}</h2>
                        <h2>{guess.explanation}</h2>
                    </div>
                ))}
                </div>
                <button className='quiz-results-button' onClick={tryQuizAgain}>Try Again?</button>
                <button className='quiz-results-button' onClick={reviseSet}>Revise Set</button>
            </div>
        )
    }
};