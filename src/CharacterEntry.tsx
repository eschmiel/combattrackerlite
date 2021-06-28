import React from 'react';
import { MainEntryProps } from './TrackerTableRow';
import addGroupEntryButton from './addGroupEntryButtonLight.svg';


export default function CharacterEntry(props: MainEntryProps) {

    let { characterData, changeCharacter, deleteRow, sortCombatants, addSubCombatant } = props.entryProps;

    return (
        
        <div className='characterEntry'>
            <input type='text' className='characterName' aria-label='name' name='name' value={characterData.name}
                onChange={(e) => changeCharacter('name', e.currentTarget.value)} />

            <input type='text' className='characterNumber' aria-label='init' name='init' value={characterData.init}
                onChange={(e) => changeCharacter('init', e.currentTarget.value)} onBlur={sortCombatants} />

            <input type='text' className='characterNumber' aria-label='hp' name='hp' value={characterData.hp}
                onChange={(e) => changeCharacter('hp', e.currentTarget.value)} />

            <input type='text' className='characterNumber' aria-label='ac' name='ac' value={characterData.ac}
                onChange={(e) => changeCharacter('ac', e.currentTarget.value)} />

            <input type='text' className='characterNotes' aria-label='notes' name='notes' value={characterData.notes}
                onChange={(e) => changeCharacter('notes', e.currentTarget.value)} />

            <div className='characterEntryButtons'>
                <div className='removeEntryButton' onClick={deleteRow} />
                <img src={addGroupEntryButton} onClick={addSubCombatant}/>
            </div>
        </div>
    );
}