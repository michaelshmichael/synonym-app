import React from 'react';
import Sidebar from './Sidebar';
import ProfileData from './ProfileData';
import '../styles/Profile.scss';

export default function Profile () {
    return(
        <div className='profile-container'>
            <Sidebar></Sidebar>
            <ProfileData></ProfileData>
        </div>
        
    )
}