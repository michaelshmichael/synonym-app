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
       
    const addLanguage = () => {
        let updatedLanguages = userData.learningLanguage.concat('A new language')
        setUserData((prevState) => ({
            ...prevState,
            learningLanguage: updatedLanguages
        }));
        // Does this have time to get the new state or only the old ones
        updateUser();
    };

    // This does not work, PUT request not working properly
    async function updateUser() {
        let requestBody = JSON.stringify(userData)
        console.log('RequestBody' + requestBody)
        console.log('UniqueId' + uniqueId)
        try {
            const updatedUser = await axios.put(`https://app.yawe.dev/api/1/ce/user-endpoint?key=ecee2707727b40f0b5c742371df2fa8b&uniqueId=${uniqueId}`, 
            { body: requestBody },
            { withCredentials: true },
            { headers: {'Content-Type': 'application/json'}}
            )
            console.log(updatedUser)
        } catch (error) {
            console.log(error)
        }
    }

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

    useEffect(() => {
        async function getUserData () {
            try {
                const user = await axios.get(APIEndpoints.getUser, {withCredentials: true});
                console.log(user.data.data)
                setUniqueId(user.data.uniqueId)
                setUserData(user.data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getUserData();
    },[]);
   
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

