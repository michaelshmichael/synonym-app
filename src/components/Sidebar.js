import React from 'react';
import '../styles/Sidebar.scss';

export default function Sidebar() {
    return(
        <div className='sidebar'>
            <div className='link-container'>
                <a href='/profile'>Profile</a>
                <a href='/profile/search'>Search</a>
                <a href='/profile/vocab'>Vocab Learner</a>
            </div>
        </div>
    )
}