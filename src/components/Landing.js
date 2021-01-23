import React from 'react';
import '../styles/Landing.scss';

export default function Landing(props) {
    if (props.signedIn === false) {
        return (
            <div className='landing-container'>
                <div className='landing-blurb'>
                    <h2>Work with Synonyms!</h2>
                </div>
                <button className='registration-button' href='registration'>Register</button>
            </div>
        );
    }
    return (
        <div className='landing-container'>
            <div className='landing-blurb'>
                <h2>Work with Synonyms!</h2>
            </div>
        </div>
    );
}

