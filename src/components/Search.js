import React, { useRef, useState } from 'react';
import '../styles/Search.scss';

export default function Search(props) {
    const [searchWord, setSearchWord] = useState('');
    const [associationArray, setAssociationArray] = useState([]);
    const inputRef = useRef();
    const searchButton = useRef();

    const createNewSearchFromResult = (e) => {
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
        <div>
            <div className='search-container'>
                <h2>Search</h2>
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
    );
}
