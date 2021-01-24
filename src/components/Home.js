import React from 'react';
import Landing from './Landing';
import Search from './Search';

export default function Home(props) {
    if (props.signedIn === false) {
        return (
            <div>
                <Landing></Landing>
            </div>
        );
    }
    return (
        <div>
            <Search language={props.language}></Search>
        </div>
    );
}

