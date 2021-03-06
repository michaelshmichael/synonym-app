import React from 'react';
import '../styles/Header.scss';

export default function Header(props) {
    
    // This conditionally renders the header (right half) depending on if the user is signed in.
    let navbarRight;
    if (props.signedIn === false) {
        console.log(props.signedIn)
        navbarRight = <div><a className="navbar-brand" href="login">Login</a>
            <a className="navbar-brand" href="registration">Register</a></div>;
    } else {
        console.log(props.signedIn)
        console.log(props.user)
        navbarRight = <div><a href={`/${props.user}`} className="navbar-brand">{props.user}</a>
            <a className="navbar-brand" href="/" onClick={props.updateSignedIn}>Sign Out</a></div>;
    }
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className='navbar-left'>
                <a className="navbar-title" href="/">Vokoban</a>
            </div>
            <div className='navbar-right'>
                {navbarRight}
            </div>
        </nav>
    );
}
