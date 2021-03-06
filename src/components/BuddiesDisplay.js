import React from 'react';

export default function BuddiesDisplay (props) {
    
    return(
        <div className='native-speakers-container'>
            {props.nativeSpeakers.map((user) => (
                <div className='native-speaker-card'>
                    <h3>{user.data.username}</h3>
                    <button>Add Friend</button>
                </div>
            ))}
        </div>
    )
}