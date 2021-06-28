import React from 'react';
import { MainEntryProps } from './TrackerTableRow'
import addGroupEntryButton from './addGroupEntryButton.svg';


export default function GroupEntry( props: MainEntryProps) {
    let { characterData, changeCharacter, sortCombatants, deleteRow, addSubCombatant } = props.entryProps;

    return (

        <div className='characterEntry'>
            <input type='text' className='characterName' aria-label='name' name='name' value={characterData.name}
                onChange={(e) => changeCharacter('name', e.currentTarget.value)} />

            <input type='text' className='characterNumber' aria-label='init' name='init' value={characterData.init}
                onChange={(e) => changeCharacter('init', e.currentTarget.value)} onBlur={sortCombatants} />

            <div className='groupBlank' />
            <div className='groupBlank' />

            <input type='text' className='characterNotes' aria-label='notes' name='notes' value={characterData.notes}
                onChange={(e) => changeCharacter('notes', e.currentTarget.value)} />

            <div className='characterEntryButtons'>
                <div className='removeEntryButton' onClick={deleteRow} />
                <img src={addGroupEntryButton} onClick={() => addSubCombatant()} />
            </div>
        </div>
    );
}