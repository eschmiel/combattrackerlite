import React from 'react';
import Character from './Character';
import addGroupEntryButton from './addGroupEntryButtonLight.svg';


interface CharacterEntryProps {
    character: Character;
    changeCharacter: (targetCharacterKey: number, targetProperty: string, newValue: string | number) => void;
    removeCharacter: () => void;
    sortCombatants: () => void;
    addSubCombatant: (targetCharacterKey: number) => void;
}

export default function CharacterEntry({ character, changeCharacter, removeCharacter, sortCombatants, addSubCombatant }: CharacterEntryProps) {

    return (
        
        <div className='characterEntry'>
            <input type='text' className='characterName' aria-label='name' name='name' value={character.name} onChange={(e) => changeCharacter(character.characterKey, 'name', e.currentTarget.value)} />
            <input type='text' className='characterNumber' aria-label='init' name='init' value={character.init} onChange={(e) => changeCharacter(character.characterKey, 'init', e.currentTarget.value)} onBlur={sortCombatants} />
            <input type='text' className='characterNumber' aria-label='hp' name='hp' value={character.hp} onChange={(e) => changeCharacter(character.characterKey, 'hp', e.currentTarget.value)} />
            <input type='text' className='characterNumber' aria-label='ac' name='ac' value={character.ac} onChange={(e) => changeCharacter(character.characterKey, 'ac', e.currentTarget.value)} />
            <input type='text' className='characterNotes' aria-label='notes' name='notes' value={character.notes} onChange={(e) => changeCharacter(character.characterKey, 'notes', e.currentTarget.value)} />
            <div className='characterEntryButtons'>
                <div className='removeEntryButton' onClick={removeCharacter} />
                <img src={addGroupEntryButton} onClick={() => addSubCombatant(character.characterKey)}/>
            </div>
        </div>
    );
}