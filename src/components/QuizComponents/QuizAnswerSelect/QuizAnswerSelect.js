import React from 'react';
import QuizScoreTally from './QuizScoreTally';
import QuizWord from './QuizWord';
import uniqid from 'uniqid';

export default function QuizAnswerSelect ({word, numberCorrect, activeUser, set, randomAnswers, selectAnswer}) {
    return(
        <div className='quiz-container'>
            <h1 className='quiz-main-title'>Quiz Yourself on the Words from the {set} Set</h1>
                <div className='quiz-word-and-tally'>
                    <div></div>
                    <QuizWord
                        word={word}>
                    </QuizWord>
                    <QuizScoreTally numberCorrect={numberCorrect} 
                        activeUser={activeUser} 
                        set={set}>
                    </QuizScoreTally>
                </div>
                <div className='quiz-answers'>
                    {randomAnswers.map((answer) => (
                        <div className='option-div'
                        key={uniqid}
                        data-index={answer}
                        onClick={e => selectAnswer(e)}
                        >{answer}</div>
                    ))}
                </div>
        </div>
    )
}