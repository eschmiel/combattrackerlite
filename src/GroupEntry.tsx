import React from 'react';
import Character from './Character';
import addGroupEntryButton from './addGroupEntryButton.svg';

interface GroupEntryProps {
    character: Character;
    changeCharacter: (targetCharacterKey: number, targetProperty: string, newValue: string | number) => void;
    removeCharacter: () => void;
 
    sortCombatants: () => void;
    addSubCombatant: (targetCharacterKey: number) => void;
}

export default function GroupEntry({ character, changeCharacter, sortCombatants, removeCharacter, addSubCombatant }: GroupEntryProps) {

    return (

        <div className='characterEntry'>
            <input type='text' className='characterName' aria-label='name' name='name' value={character.name} onChange={(e) => changeCharacter(character.characterKey, 'name', e.currentTarget.value)} />
            <input type='text' className='characterNumber' aria-label='init' name='init' value={character.init} onChange={(e) => changeCharacter(character.characterKey, 'init', e.currentTarget.value)} onBlur={sortCombatants} />
            <div className='groupBlank' />
            <div className='groupBlank' />
            <input type='text' className='characterNotes' aria-label='notes' name='notes' value={character.notes} onChange={(e) => changeCharacter(character.characterKey, 'notes', e.currentTarget.value)} />
            <div className='characterEntryButtons'>
                <div className='removeEntryButton' onClick={removeCharacter} />
                <img src={addGroupEntryButton} onClick={() => addSubCombatant(character.characterKey)} />
            </div>
        </div>
    );
}