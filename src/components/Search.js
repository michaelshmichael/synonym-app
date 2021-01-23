import React, { useState, useEffect} from 'react';
import '../styles/Search.scss';

export default function Search() {
    const [searchWord, setSearchWord] = useState('');
    const [associationArray, setAssociationArray] = useState([]);

    const updateSearchWord = (e) => {
        setSearchWord(e.target.value);
        console.log(searchWord)
    }

    class association {
        constructor(meaning, partOfSpeech, weight){
            this.meaning = meaning
            this.partOfSpeech = partOfSpeech;
            this.weight = weight;
        }
    }
    
    async function _getAssociations () {
        try {
            let data = await fetch(`https://api.wordassociations.net/associations/v1.0/json/search?apikey=5b4acb51-a76e-4d05-9349-8044794dea94&text=${searchWord}&lang=en&limit=10`, {mode: 'cors'})
            let words = await data.json()
            return words
        } catch {
            console.log('error')
        }
    }
    
    async function setAssociations () {
        let firstAssociation = new association()
        let secondAssociation = new association()
        let data = await _getAssociations()
        let placeholderArray = []
    
        firstAssociation.meaning = data.response[0].items[0].item
        firstAssociation.partOfSpeech = data.response[0].items[0].pos
        firstAssociation.weight = data.response[0].items[0].weight
    
        secondAssociation.meaning = data.response[0].items[1].item
        secondAssociation.partOfSpeech = data.response[0].items[1].pos
        secondAssociation.weight = data.response[0].items[1].weight
        
        placeholderArray.push(firstAssociation, secondAssociation)
        console.log(placeholderArray)
        setAssociationArray(placeholderArray)
        return associationArray
    }

    // useEffect(() => {
    //     console.log('AA = ' + associationArray[0].meaning)
    //   }, [associationArray]);
    let associationContainer ;
    if(associationArray.length === 0) {
        associationContainer = <div className='association-container'></div>
    } else {
        associationContainer = 
        <div className='association-container'>
            <p>{associationArray[0].meaning}</p>
            <p>{associationArray[1].meaning}</p>
        </div>
    }

    return (
        <div>
            <div className='search-container'>
                <h2>Search</h2>
                <input type='text' className='search-input-text' onChange={e => updateSearchWord(e)}></input>
                <button className='find-synonyms-button' onClick={setAssociations}>Find Associations</button>
            </div>
            {associationContainer}
        </div>
    );
}