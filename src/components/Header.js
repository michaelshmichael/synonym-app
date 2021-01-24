import React from 'react';
import '../styles/Header.scss';

export default function Header(props) {
    let navbarRight;
    if (props.signedIn === false) {
        navbarRight = <div><a className="navbar-brand" href="login">Login</a>
            <a className="navbar-brand" href="registration">Register</a></div>;
    } else {
        navbarRight = <div><a href='/profile' className="navbar-brand">Welcome {props.user}</a>
            <a className="navbar-brand" href="/" onClick={props.updateSignedIn}>Sign Out</a></div>;
    }
    return (
        <nav className="navbar navbar-dark bg-primary">
            <div className='navbar-left'>
                <a className="navbar-brand" href="/">Word Associations</a>
                <button onClick={e => props.setLanguage('en')}>En</button>
                <button onClick={e => props.setLanguage('ru')}>Ru</button>
            </div>
            <div className='navbar-right'>
                {navbarRight}
            </div>
        </nav>
    );
}
