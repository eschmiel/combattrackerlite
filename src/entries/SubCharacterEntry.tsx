import React from 'react';
import { SubEntryProps } from '../TrackerTableRow';


export default function SubCharacterEntry(props: SubEntryProps) {
    let { subCharacter, changeSubCharacter, removeSubCombatant } = props.entryProps;

    return (

        <div className='subCharacterEntry'>
            <input type='text' className='characterName' aria-label='name' name='name' value={subCharacter.name}
                onChange={(e) => changeSubCharacter('name', e.currentTarget.value)} />

            <div className='groupBlank' />

            <input type='text' className='characterNumber' aria-label='hp' name='hp' value={subCharacter.hp}
                onChange={(e) => changeSubCharacter('hp', e.currentTarget.value)} />

            <input type='text' className='characterNumber' aria-label='ac' name='ac' value={subCharacter.ac}
                onChange={(e) => changeSubCharacter( 'ac', e.currentTarget.value)} />

            <input type='text' className='characterNotes' aria-label='notes' name='notes' value={subCharacter.notes}
                onChange={(e) => changeSubCharacter('notes', e.currentTarget.value)} />

            <div className='characterEntryButtons'>
                <div className='removeEntryButton' onClick={() => removeSubCombatant(subCharacter.subCharacterKey)} />
            </div>
        </div>
    );
}