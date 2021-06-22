import React from 'react';
import Character from './Character';


interface CharacterEntryProps {
    character: Character;
    changeCharacter: (targetCharacterKey: number, targetProperty: string, newValue: string | number) => void;
}

export default function CharacterEntry({ character, changeCharacter }: CharacterEntryProps) {
    return (
        <div className='characterEntry'>
            <input type='text' className='characterName' aria-label='name' name='name' value={character.name} onChange={(e) => changeCharacter(character.characterKey, 'name', e.currentTarget.value)}/>
            <input type='text' className='characterNumber' aria-label='init' name='init' value={character.init} onChange={(e) => changeCharacter(character.characterKey, 'init', e.currentTarget.value)}/>
            <input type='text' className='characterNumber' aria-label='hp' name='hp' value={character.hp} onChange={(e) => changeCharacter(character.characterKey, 'hp', e.currentTarget.value)}/>
            <input type='text' className='characterNumber' aria-label='ac' name='ac' value={character.ac} onChange={(e) => changeCharacter(character.characterKey, 'ac', e.currentTarget.value)}/>
            <input type='text' className='characterNotes' aria-label='notes' name='notes' value={character.notes} onChange={(e) => changeCharacter(character.characterKey, 'notes', e.currentTarget.value)}/>
        </div>

    );
}