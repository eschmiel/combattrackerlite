import React from 'react';
import { CharacterData } from './TrackerTable';

/*
interface CharacterEntryProps {
    character: Character;
    changeCharacterDataFunctions: ChangeCharacterDataFunctions;
}*/

export default function CharacterEntry({ character, changeCharacter }: CharacterData) {
    return (
        <div className='characterEntry'>
            <input type='text' className='characterName' aria-label='name' name='name' value={character.name} onChange={changeCharacter}/>
            <input type='text' className='characterNumber' aria-label='init' name='init' value={character.init} onChange={changeCharacter}/>
            <input type='text' className='characterNumber' aria-label='hp' name='hp' value={character.hp} onChange={changeCharacter}/>
            <input type='text' className='characterNumber' aria-label='ac' name='ac' value={character.ac} onChange={changeCharacter}/>
            <input type='text' className='characterNotes' aria-label='notes' name='notes' value={character.notes} onChange={changeCharacter}/>
        </div>

    );
}