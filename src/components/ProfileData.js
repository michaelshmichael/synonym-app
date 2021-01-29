import React from 'react';

export default function ProfileData(props) {
    return(
        <div className='profile-data'>
            <h1 className='profile-name'>{props.user}</h1>
        </div>
    )
};

