import React from 'react';
import '../styles/Profile.scss';

export default function Profile (props) {
    return(
        <div className='profile-container'>
            <div className='sidebar'>
                <a href='/search'>Search</a>
            </div>
            <div className='profile-data'>
                <h1 className='profile-name'>{props.user}</h1>
            </div>
        </div>
        
    )
}