import React from 'react';

export default function BuddiesDisplay (props) {
    
    return(
        <div className='native-speakers-container'>
            {props.nativeSpeakers.map((user) => (
                <div className='native-speaker-card'>
                    <h1>{user.data.username}</h1>
                </div>
            ))}
        </div>
    )
}