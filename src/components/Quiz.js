import React from 'react';
import Sidebar from './Sidebar';
import '../styles/Quiz.scss';

export default function Quiz() {
    return(
        <div className='quiz-page-container'>
                <Sidebar className='sidebar'></Sidebar>
                <div className='quiz-main-container'>
                <h1>Choose A Set for the Quiz</h1>
                </div>
        </div>
         
    )
}