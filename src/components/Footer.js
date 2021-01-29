import React from 'react';
import '../styles/Footer.scss';

export default function Footer () {
    return(
        <div className='footer'>
            <div className='personal-details'>
                <p className='shop-owner'>Owner and Proprietor: Leland Gaunt.</p>      
                <p className='contact-details'>Email: badguy17@hades.com Tel: 1 (666) 111-9876</p> 
            </div>
            
            <div className='address'>Castle Rock, Maine. Est. 1993.</div>
        </div>
    )
}