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
    const [newLearningLanguage, setNewLearningLanguage] = useState('English');
    
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
        if(activeUser.data.nativeLanguage === newLearningLanguage){
            alert('You know this already')
        } else if(!activeUser.data.learningLanguage.includes(newLearningLanguage)){
            let updatedLanguages = [...activeUser.data.learningLanguage, newLearningLanguage]
            setActiveUser((prevState) => {
                const newState = Object.assign({}, prevState);
                newState.data.learningLanguage = updatedLanguages;
                return newState;
            });
        } else {
            alert('Already Learning')
        }
    };

    const deleteLanguage = (languageToDelete) => {
        let updatedLanguages = activeUser.data.learningLanguage.filter(element => element !== languageToDelete)
        setActiveUser((prevState) => {
            const newState = Object.assign({}, prevState);
            newState.data.learningLanguage = updatedLanguages;
            return newState;
        });
    }

    // May want to change this function later to allow for ANY user changes
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
                        <div className='learning-languages-individual'>
                        <h2>{language}</h2>
                        <button className='learning-languages-individual-button'
                        //data-index={language}
                        onClick={e => deleteLanguage(language)}
                        >Delete</button>
                        </div>
                    ))}
                    <div>
                        <h3>Another Language?</h3>
                        <select onChange={e => setNewLearningLanguage(e.currentTarget.value)} 
                        id="learningLanguage" 
                        name="learningLanguage"
                        placeholder="Another Language?">
                            <option value="English">English</option>
                            <option value="Russian">Russian</option>
                            <option value="Portuguese">Portuguese</option>
                            <option value="Spanish">Spanish</option>
                        </select>
                    </div>
                    <button onClick={addLanguage}>Add</button>
                </div>
            </div>
        )
    }
};

