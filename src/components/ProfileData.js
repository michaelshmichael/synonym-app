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

export default function ProfileData() {
    const [userData, setUserData] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [nativeLanguageFlag, setNativeLanguageFlag] = useState();
       
    useEffect(() => {
        async function getUserData () {
            try {
                const user = await axios.get(APIEndpoints.authenticationEndpoint, {withCredentials: true});
                console.log(user.data.data)
                setUserData(user.data.data);
                console.log(user.data.uniqueId)
                setUniqueId(user.data.uniqueId);  
            } catch (error) {
                console.error(error);
            }
        }
        getUserData();
    },[]);

    useEffect(() => {  
        // Make this DRY   
        if(userData.nativeLanguage === 'Portuguese') {
            setNativeLanguageFlag(portugal)
        } else if (userData.nativeLanguage === 'French') {
            setNativeLanguageFlag(france)
        } else if (userData.nativeLanguage === 'Italian') {
            setNativeLanguageFlag(italy) 
        } else if (userData.nativeLanguage === 'German') {
            setNativeLanguageFlag(germany)
        } else if (userData.nativeLanguage === 'Russian') {
            setNativeLanguageFlag(russia)
        } else if (userData.nativeLanguage === 'Spanish') {
            setNativeLanguageFlag(spain)
        } else if (userData.nativeLanguage === 'English') {
            setNativeLanguageFlag(unitedKingdom)
        }
    },[userData]);

    // Fix this
    // This function sets a new user object without a password to send to the
    // unauthenticated endpoint. This can then be updated without a password
    useEffect(() => {  
        async function setUserWithoutPassword () {
            console.log('UniqueId' + uniqueId)
            console.log(typeof(uniqueId))
            userData.uniqueId = uniqueId;
            setUserData(userData);
            console.log(userData);
            try {
                await axios.post(APIEndpoints.userDataEndpoint, 
                { data: userData}, 
                { withCredentials: true },
                { headers: {'Content-Type': 'application/json'}}
                )
            } catch (error) {
                console.log(error)
            }
        };
        setUserWithoutPassword();
    },[uniqueId]);

    const addLanguage = () => {
        let updatedLanguages = userData.learningLanguage.concat('A new language')
        setUserData((prevState) => ({
            ...prevState,
            learningLanguage: updatedLanguages
        }));
        updateUserLanguage();
    };

    async function updateUserLanguage() {
        const requestBody = JSON.stringify(userData);
        console.log(uniqueId)
        console.log(requestBody)
        try {
            const updatedUser = await axios.put(`https://app.yawe.dev/api/1/ce/user-data-endpoint?key=ecee2707727b40f0b5c742371df2fa8b&uniqueId=${uniqueId}`, 
            { data: requestBody},
            { withCredentials: true },
            { headers: {'Content-Type': 'application/json'}}
            )
            console.log(updatedUser)
        } catch (error) {
            console.log(error)
        }
    };

    if(!userData) {
        return(
            <span>Loading...</span>
        )
    }
    return(
        <div className='profile-data'>
            <div className='username-and-flag-container'>
                <h1 className='profile-name'>{userData.username}</h1>
                <img className='native-language-flag' src={nativeLanguageFlag} alt='flag-showing-native-language'></img>
            </div>
            <div className='learning-languages-container'>
                <h1>Languages Being Studied</h1>
                {userData.learningLanguage.map((language) => (
                    <h2>{language}</h2>
                ))}
                <button onClick={addLanguage}>Add another language?</button>
            </div>
        </div>
    )
};

