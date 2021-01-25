import React from 'react';
import unitedKingdom from '../svg/unitedKingdom.svg';
import russia from '../svg/russia.svg';
import portugal from '../svg/portugal.svg';
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
                <div className='language-flags-container'>
                    <img className='language-flags' src={unitedKingdom} alt='united-kingdom' onClick={e => props.setLanguage('en')}/>
                    <img className='language-flags' src={russia} alt='russia' onClick={e => props.setLanguage('ru')}/>
                    <img className='language-flags' src={portugal} alt='portugal' onClick={e => props.setLanguage('pt')}/>
                </div>
            </div>
            <div className='navbar-right'>
                {navbarRight}
            </div>
        </nav>
    );
}
