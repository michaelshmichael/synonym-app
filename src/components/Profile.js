import React from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileData from './ProfileData';

import '../styles/Profile.scss';

export default function Profile (props) {
    return(
        <div className='profile-container'>
            <ProfileSidebar></ProfileSidebar>
            <ProfileData user={props.user}></ProfileData>
        </div>
        
    )
}