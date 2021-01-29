import React from 'react';
import ProfileData from './ProfileData';
import '../styles/Profile.scss';

export default function Profile (props) {
    return(
        <div className='profile-container'>
            
            <ProfileData user={props.user}></ProfileData>
        </div>
        
    )
}