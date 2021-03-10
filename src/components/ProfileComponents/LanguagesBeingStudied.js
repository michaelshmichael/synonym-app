import React from 'react';
import uniqid from 'uniqid';
import { FaTrashAlt } from 'react-icons/fa';

export default function LanguagesBeingStudied ({activeUser, deleteLanguage}) {
    return (
        <div className='learning-languages-container'>
            <h1>Languages Being Studied</h1>
            {activeUser.data.learningLanguage.map((language) => (
                <div className='learning-languages-individual' key={uniqid}>
                <h2>{language}</h2>
                <FaTrashAlt className='learning-languages-individual-button'
                onClick={e => deleteLanguage(language)}
                >Delete</FaTrashAlt>
                </div>
            ))}
        </div>  
    )
}