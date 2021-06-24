import React from 'react';
import { SubCharacter } from './Character';

interface SubCharacterEntryProps {
    subCharacter: SubCharacter;
    characterKey: number
    changeSubCharacter: (targetCharacterKey: number, targetSubCharacterKey: number, targetProperty: string, newValue: string | number) => void;
    
}

export default function SubCharacterEntry({ subCharacter, characterKey, changeSubCharacter }: SubCharacterEntryProps) {
    return (

        <div className='subCharacterEntry'>
            <input type='text' className='characterName' aria-label='name' name='name' value={subCharacter.name} onChange={(e) => changeSubCharacter(characterKey, subCharacter.subCharacterKey, 'name', e.currentTarget.value)} />
            <div className='groupBlank' />
            <input type='text' className='characterNumber' aria-label='hp' name='hp' value={subCharacter.hp} onChange={(e) => changeSubCharacter(characterKey, subCharacter.subCharacterKey, 'hp', e.currentTarget.value)} />
            <input type='text' className='characterNumber' aria-label='ac' name='ac' value={subCharacter.ac} onChange={(e) => changeSubCharacter(characterKey, subCharacter.subCharacterKey, 'ac', e.currentTarget.value)} />
            <input type='text' className='characterNotes' aria-label='notes' name='notes' value={subCharacter.notes} onChange={(e) => changeSubCharacter(characterKey, subCharacter.subCharacterKey, 'notes', e.currentTarget.value)} />
            <div className='characterEntryButtons'>
                <div className='removeEntryButton' />
            </div>
        </div>
    );
}