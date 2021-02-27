import React, { useEffect, useState, useRef } from 'react';
import Sidebar from './Sidebar';
import BuddiesDisplay from './BuddiesDisplay';
import axios from 'axios';
import APIEndpoints from '../api';
import '../styles/Buddies.scss';

export default function Buddies (props) {
    const [nativeLanguageToSearch, setNativeLanguageToSearch] = useState('');
    const [nativeSpeakers, setNativeSpeakers] = useState('');
    const [allUsers, setAllUsers] = useState('');
    const [nativeSpeakersAvailable, setNativeSpeakersAvailable] = useState(false)
    const firstTimeRender = useRef(true)

    
    useEffect(() => {
        async function getUserData () {
            try {
                const allUsers = await axios.get(APIEndpoints.userDataEndpoint, {withCredentials: true});
                setAllUsers(allUsers.data)
                firstTimeRender.current = false; 
            } catch (error) {
                console.error(error);
            }
        }
        getUserData();
    },[])   
  
    useEffect(() => {
        if(firstTimeRender.current === false) {
        displayNativeSpeakers()
        }
    }, [nativeLanguageToSearch])

    const displayNativeSpeakers = () => {
        let filteredToNativeSpeakers = allUsers.filter(user => user.data.nativeLanguage == nativeLanguageToSearch)
        setNativeSpeakers(filteredToNativeSpeakers);
    }

    useEffect(() => {
        if(firstTimeRender.current === false) {
        setNativeSpeakersAvailable(true)
        }
    }, [nativeSpeakers])

   

    return(
        <div className='buddies-page-container'>
            <Sidebar></Sidebar>
            <div className='buddies-main-container'>
                <h1>Search for native speakers of your target language. Say hi and start a conversation!</h1>
                <h3>What language are you looking for?</h3>
                    <div className="form-group">
                            <select onChange={e => setNativeLanguageToSearch([e.currentTarget.value])}
                            value={nativeLanguageToSearch} 
                            id="nativeLanguageToSearch" 
                            name="nativeLanguageToSearch">
                                <option value="English">English</option>
                                <option value="Russian">Russian</option>
                                <option value="Portuguese">Portuguese</option>
                                <option value="Spanish">Spanish</option>
                            </select>
                    </div>
                    <div>
                        {nativeSpeakersAvailable &&
                        <div>
                        <h1>A stranger is a friend waiting to happen.</h1>
                        <BuddiesDisplay nativeSpeakers={nativeSpeakers}></BuddiesDisplay>
                        </div>
                        }
                    </div>
            </div>
        </div>
    )
}