import { React, useEffect, useState } from 'react';
import axios from 'axios';
import unitedKingdom from '../svg/unitedKingdom.svg';
import russia from '../svg/russia.svg';
import portugal from '../svg/portugal.svg';
import italy from '../svg/italy.svg';
import france from '../svg/france.svg';
import germany from '../svg/germany.svg';
import spain from '../svg/spain.svg';
import APIEndpoints from '../api';
import '../styles/ProfileData.scss';

export default function ProfileData(props) {
    const [userData, setUserData] = useState('');
    const [nativeLanguageFlag, setNativeLanguageFlag] = useState();
       
    useEffect(() => {  
        // Make this DRY   
        if(userData.nativeLanguageValue === 'Portuguese') {
            setNativeLanguageFlag(portugal)
        } else if (userData.nativeLanguageValue === 'French') {
            setNativeLanguageFlag(france)
        } else if (userData.nativeLanguageValue === 'Italian') {
            setNativeLanguageFlag(italy) 
        } else if (userData.nativeLanguageValue === 'German') {
            setNativeLanguageFlag(germany)
        } else if (userData.nativeLanguageValue === 'Russian') {
            setNativeLanguageFlag(russia)
        } else if (userData.nativeLanguageValue === 'Spanish') {
            setNativeLanguageFlag(spain)
        } else if (userData.nativeLanguageValue === 'English') {
            setNativeLanguageFlag(unitedKingdom)
        }
    },[userData]);

    useEffect(() => {
        async function getUserData () {
            try {
                const user = await axios.get(APIEndpoints.getUser, {withCredentials: true});
                console.log(user.data.data)
                setUserData(user.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getUserData();
    },[]);
   

    return(
        <div className='profile-data'>
            <div className='username-and-flag-container'>
                <h1 className='profile-name'>{props.user}</h1>
                <img className='native-language-flag' src={nativeLanguageFlag} alt='flag-showing-native-language'></img>
            </div>
            
            <form>
                <input type='text' placeholder='What language are you learning?'></input>
            </form>
        </div>
    )
};

