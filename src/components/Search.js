import React, { useState } from 'react';
import '../styles/Search.scss';

export default function Search() {
    const [searchWord, setSearchWord] = useState('')

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
            console.log('go')
            let data = await fetch(`https://api.wordassociations.net/associations/v1.0/json/search?apikey=5b4acb51-a76e-4d05-9349-8044794dea94&text=${searchWord}&lang=en&limit=10`, {mode: 'cors'})
            let words = await data.json()
            console.log(words)
            return words
        } catch {
            console.log('error')
        }
    }
    
    async function _setAssociations () {
        let firstAssociation = new association()
        let secondAssociation = new association()
        let data = await _getAssociations()
        let synonymArray = []
    
        firstAssociation.meaning = data.response[0].items[0].item
        firstAssociation.partOfSpeech = data.response[0].items[0].pos
        firstAssociation.weight = data.response[0].items[0].weight
    
        secondAssociation.meaning = data.response[0].items[1].item
        secondAssociation.partOfSpeech = data.response[0].items[1].pos
        secondAssociation.weight = data.response[0].items[1].weight
        
        synonymArray.push(firstAssociation, secondAssociation)
        return synonymArray
    }
    
    async function renderAssociations() {
        //defaultFunctions.setLoader()
        let array = await _setAssociations()
        //defaultFunctions.removeLoader()
        // array.forEach(element => {
        //     let container = document.createElement('div')
        //     container.classList.add('.wordContainer')
        //     let synonymContainer = document.getElementById('synonymContainer')
        //     synonymContainer.appendChild(container)
        //     container.textContent = element.meaning
        // })
        console.log(array)
    };

    return (
        <div>
            <div className='search-container'>
                <h2>Search</h2>
                <input type='text' className='search-input-text' onChange={e => updateSearchWord(e)}></input>
                <button className='find-synonyms-button' onClick={renderAssociations}>Find Synonyms</button>
            </div>
        </div>
    );
}