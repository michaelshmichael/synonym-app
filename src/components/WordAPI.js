import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/VocabInfo.scss';

export default function WordAPI (props) {
    const [APIdefinition, setAPIDefinition] = useState('');
    const [APIpronunciation, setAPIPronunciation] = useState('');
    const [definitionNumber, setDefinitionNumber] = useState(0);
    const [previousDefinitionButton, setPreviousDefinitionButton] = useState(false)

    // useEffect(() => {
    //     async function WordAPICall () {
    //         try {
    //             const result = await axios.get(`https://wordsapiv1.p.rapidapi.com/words/${props.vocabItem}`,
    //                 {headers: {
    //                     'x-rapidapi-key': 'f74c925871msh70f9c315d6fed91p101f0cjsn861ef3bc1f60',
    //                     'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
    //                 }})
    //                 setAPIPronunciation(result.data.pronunciation.all);
    //                 setAPIDefinition(result.data.results[definitionNumber].definition);
    //                 console.log(result)             
    //             } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     WordAPICall();
    // },[definitionNumber]);

    const toggleDefinitionNumber = (e) => {
        if(previousDefinitionButton === true && definitionNumber >= 0){
            setPreviousDefinitionButton(false)
        }
        let newNumber;
        e.target.dataset.index === 'forward' 
        ? newNumber = definitionNumber +1 
        : newNumber = definitionNumber -1
        setDefinitionNumber(newNumber);
        if(definitionNumber === 0){
            setPreviousDefinitionButton(true)
        }
    }

    return (
        <div className='vocab-item-api-data'>
            <h3>Pronunciation</h3>
                <h2>{APIpronunciation}</h2>
            <h3>Definition</h3>
                <h2>{APIdefinition}</h2>

            <button data-index='back' disabled={previousDefinitionButton} onClick={e => toggleDefinitionNumber(e)}>Previous Definition</button>
            <button data-index='forward' onClick={e => toggleDefinitionNumber(e)}>Next Definition</button>
        </div>
    )
}