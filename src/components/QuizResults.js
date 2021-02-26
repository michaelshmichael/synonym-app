import React from 'react';

export default function QuizResults (props) {
    return(
        <div>
            <h1 className='quiz-results-header'>Wrong Guesses</h1>
            {props.wrongGuesses.map((guess) => (
                <div>
                    <h2>{guess.word}</h2>
                    <h3>{guess.explanation}</h3>
                </div>
            ))}
            <button onClick={props.tryQuizAgain}>Try Again?</button>
        </div>
    )
}