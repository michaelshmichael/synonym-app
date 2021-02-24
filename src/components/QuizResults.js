import React from 'react';

export default function QuizResults (props) {
    return(
        <div>
            <h1 className='quiz-results-header'>Wrong Guesses</h1>
            {props.wrongGuesses.map((guess) => (
                <h2>{guess}</h2>
            ))}
            <button onClick={props.tryQuizAgain}>Try Again?</button>
        </div>
    )
}