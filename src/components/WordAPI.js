import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/VocabInfo.scss';

export default function WordAPI (props) {

    const [APIdefinition, setAPIDefinition] = useState('');
    const [APIexample, setAPIExample] = useState('');
    const [APIpronunciation, setAPIPronunciation] = useState('');
    const [definitionNumber, setDefinitionNumber] = useState(0);

    useEffect(() => {
        async function WordAPICall () {
            try {
                const result = await axios.get(`https://wordsapiv1.p.rapidapi.com/words/${props.vocabItem}`,
                    {headers: {
                        'x-rapidapi-key': 'f74c925871msh70f9c315d6fed91p101f0cjsn861ef3bc1f60',
                        'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
                    }})
                    setAPIPronunciation(result.data.pronunciation.all);
                    setAPIDefinition(result.data.results[definitionNumber].definition);
                    setAPIExample(result.data.results[definitionNumber].examples[0]);
                    console.log(result)                
                } catch (error) {
                console.log(error)
            }
        }
        WordAPICall();
    },[definitionNumber]);

    const toggleDefinitionNumber = () => {
        let newNumber = definitionNumber +1
        console.log(newNumber)
        setDefinitionNumber(newNumber);
    }
    return (
        <div className='vocab-item-api-data'>
            <h3>Pronunciation</h3>
                <h2>{APIpronunciation}</h2>
            <h3>Definition</h3>
                <h2>{APIdefinition}</h2>
            <h3>Example</h3>
                <h2>{APIexample}</h2>
            <button onClick={toggleDefinitionNumber}>Next Definition</button>
        </div>
    )
}