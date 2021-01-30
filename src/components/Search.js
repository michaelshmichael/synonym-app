import React, { useRef, useState } from 'react';
import Sidebar from './Sidebar.js';
import unitedKingdom from '../svg/unitedKingdom.svg';
import russia from '../svg/russia.svg';
import portugal from '../svg/portugal.svg';
import italy from '../svg/italy.svg';
import france from '../svg/france.svg';
import germany from '../svg/germany.svg';
import spain from '../svg/spain.svg';
import '../styles/Search.scss';

export default function Search(props) {
    const [searchWord, setSearchWord] = useState('');
    const [associationArray, setAssociationArray] = useState([]);
    const inputRef = useRef();
    const searchButton = useRef();
    
    let x;
    if (props.language === 'en') {
        x = 'Search in English';
    } else if (props.language === 'ru') {
        x = 'Search in Russian';
    } else if (props.language === 'pt') {
        x = 'Search in Portuguese'
    } else if (props.language === 'de') {
        x = 'Search in German';
    } else if (props.language === 'fr') {
        x = 'Search in French';
    } else if (props.language === 'it') {
        x = 'Search in Italian';
    } else if (props.language === 'es') {
        x = 'Search in Spanish';
    }

    const createNewSearchFromResult = (e) =>  {
        setSearchWord(e);
        inputRef.current.value = e;
        searchButton.current.focus();
    };

    class association {
        constructor(meaning, partOfSpeech, weight){
            this.meaning = meaning
            this.partOfSpeech = partOfSpeech;
            this.weight = weight;
        }
    };
    
    async function _getAssociations () {
        try {
            let data = await fetch(`https://api.wordassociations.net/associations/v1.0/json/search?apikey=5b4acb51-a76e-4d05-9349-8044794dea94&text=${searchWord}&lang=${props.language}&limit=10`, {mode: 'cors'})
            let words = await data.json()
            console.log(words)
            return words
        } catch {
            console.log('Error')
        }
    };

    const _makeAssociationData = (data, i) => {
        let defaultAssociation = new association();
        defaultAssociation.meaning = data.response[0].items[i].item
        defaultAssociation.partOfSpeech = data.response[0].items[i].pos
        defaultAssociation.weight = data.response[0].items[i].weight
        return defaultAssociation
    }
    
    async function setAssociations () {
        let words = await _getAssociations()
        if(words.response[0].items.length !== 0) {
            let placeholderArray = []
            for(let i=0; i < 10; i++) {
                let association =_makeAssociationData(words, i)
                placeholderArray.push(association)
            }
            setAssociationArray(placeholderArray)
        } else {
            alert('Try new word')
        }  
    };

    return (
        <div className='search-page-container'>
            <Sidebar className='sidebar'></Sidebar>
            <div className='search-and-results-container'>
                <div className='language-flags-container'>
                    <img className='language-flags' src={unitedKingdom} alt='united-kingdom' onClick={e => props.setLanguage('en')}/>
                    <img className='language-flags' src={russia} alt='russia' onClick={e => props.setLanguage('ru')}/>
                    <img className='language-flags' src={portugal} alt='portugal' onClick={e => props.setLanguage('pt')}/>
                    <img className='language-flags' src={italy} alt='italy' onClick={e => props.setLanguage('it')}/>
                    <img className='language-flags' src={germany} alt='germany' onClick={e => props.setLanguage('de')}/>
                    <img className='language-flags' src={spain} alt='spain' onClick={e => props.setLanguage('es')}/>
                    <img className='language-flags' src={france} alt='france' onClick={e => props.setLanguage('fr')}/>
                    
                </div>
                <div className='search-container'>
                    
                    <h2> {x} </h2>
                    <div className='search-input-and-button'>
                        <input ref={inputRef} type='text' className='search-input-text' 
                        onChange={e => setSearchWord(e.target.value)}>
                        </input>
                        <button ref={searchButton} className='find-synonyms-button' 
                        onClick={setAssociations}>Find Associations
                        </button>
                    </div>
                </div>
                <div className='association-container'>
                {associationArray.map((word) => {
                    return<div data-index={word.meaning} className='association-box' onClick={e => createNewSearchFromResult(e.target.dataset.index)}>
                        <p data-index={word.meaning}>{word.meaning}</p>
                        <p data-index={word.meaning}>{word.partOfSpeech}</p>
                        <p data-index={word.meaning}>{word.weight}</p>
                    </div>
                })}
                </div>
            </div>
        </div>
    );
}
