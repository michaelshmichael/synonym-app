import React from 'react';
import learningSVG from '../svg/learning.svg';
import '../styles/Landing.scss';

export default function Landing() {
    
    return (
        <div className='landing-container'>
            <div className='landing-blurb'>
                <h2>Work with Synonyms!</h2>
            </div>
            <img className='learning-svg' src={learningSVG} alt='person-learning'></img>
            <button className='registration-button' href='registration'>Register</button>
        </div>
    );
}