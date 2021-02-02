import React from 'react';
import Sidebar from './Sidebar';
import ProfileData from './ProfileData';
import '../styles/Profile.scss';

export default function Profile (props) {
    return(
        <div className='profile-container'>
            <Sidebar></Sidebar>
            <ProfileData user={props.user}></ProfileData>
        </div>
        
    )
}