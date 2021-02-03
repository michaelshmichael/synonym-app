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

export default function ProfileData(props) {
    const [activeUser, setActiveUser] = useState('');
    const [uniqueId, setUniqueId] = useState('')
    const [nativeLanguageFlag, setNativeLanguageFlag] = useState();
    
    useEffect(() => {
        async function getUserData () {
            try {
                const allUsers = await axios.get(APIEndpoints.userDataEndpoint, {withCredentials: true});
                getActiveUser(allUsers);
                console.log('ALL USERS')
                console.log(allUsers)
            } catch (error) {
                console.error(error);
            }
        }
        getUserData();
    },[]);

    const displayFlag = (userData) => {
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
    };

    const getActiveUser = (allUsers) => {
        const currentActiveUser = allUsers.data.find(element => element.data.username === props.user);
        displayFlag(currentActiveUser.data);
        setActiveUser(currentActiveUser);
        setUniqueId(currentActiveUser.uniqueId);
    }

    const addLanguage = () => {
        let updatedLanguages = [...activeUser.data.learningLanguage, ...'L']
        setActiveUser((prevState) => {
            const newState = Object.assign({}, prevState);
            newState.data.learningLanguage = updatedLanguages;
            return newState;
          });
    };
    
    useEffect(() => {
        if(uniqueId){
            async function updateUserLanguage() {
                console.log('LANGUAGE CHANGED')
                console.log(activeUser)
                try {
                    const updatedUser = await axios.put(`https://app.yawe.dev/api/1/ce/non-auth-endpoint?key=b0188b53ea77419ba1d6dcda06e4bea9&uniqueId=${uniqueId}`, 
                    activeUser.data,
                    { withCredentials: true },
                    { headers: {'Content-Type': 'application/json'}}
                    )
                    console.log('UPDATED USER')
                    console.log(updatedUser.data)
                } catch (error) {
                    console.log(error)
                }
            }
            updateUserLanguage();
        };
    }, [activeUser])
    

    if(!activeUser) {
        return(
            <span>Loading...</span>
        )
    } else {
    return(
        <div className='profile-data'>
            <div className='username-and-flag-container'>
                <h1 className='profile-name'>{activeUser.data.username}</h1>
                <img className='native-language-flag' src={nativeLanguageFlag} alt='flag-showing-native-language'></img>
            </div>
            <div className='learning-languages-container'>
                <h1>Languages Being Studied</h1>
                {activeUser.data.learningLanguage.map((language) => (
                    <h2>{language}</h2>
                ))}
                <button onClick={addLanguage}>Add another language?</button>
            </div>
        </div>
    )
    }
};

