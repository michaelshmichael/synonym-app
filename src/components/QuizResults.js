import React from 'react';

export default function QuizResults ({wrongGuesses, tryQuizAgain}) {
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
            <button className='quiz-results-try-again' onClick={tryQuizAgain}>Try Again?</button>
        </div>
    )
}