import React from 'react';

export default function QuizScoreTally ({numberCorrect, activeUser, set}) {
    return(
        <div className='correct-tally-number'>
            {numberCorrect}/{activeUser.data.vocab[set].length}
        </div>
    )
}