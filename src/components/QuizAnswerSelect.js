import React from 'react';
import uniqid from 'uniqid';

export default function QuizAnswerSelect (props) {
    return(
        <div className='quiz-container'>
            <h1 className='quiz-main-title'>Quiz Yourself on the Words from the {props.set} Set</h1>
                <div className='quiz-word'>
                    {props.word} {props.numberCorrect}/{props.activeUser.data.vocab[props.set].length}
                </div>
                <div className='quiz-answers'>
                    {props.answers.map((answer) => (
                        <div className='option-div'
                        key={uniqid}
                        data-index={answer}
                        onClick={e => props.selectAnswer(e)}
                        >{answer}</div>
                    ))}
                </div>
        </div>
    )
}