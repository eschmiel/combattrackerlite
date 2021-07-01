import { useState } from 'react';
import { MainEntryProps } from '../TrackerTableRow'
import addGroupEntryButton from '../img/addGroupEntryButtonLight.svg';
import highlightAddGroupEntryButton from '../img/addGroupEntryButton.svg';


export default function GroupEntry( props: MainEntryProps) {
    let { characterData, changeCharacter, sortCombatants, deleteRow, addSubCombatant } = props.entryProps;

    const [addEntryButton, changeAddEntryButton] = useState(addGroupEntryButton);

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
                <img src={addEntryButton} onClick={() => addSubCombatant()} alt='Button for adding sub-entries'
                    onMouseOver={() => changeAddEntryButton(highlightAddGroupEntryButton)} onMouseLeave={() => changeAddEntryButton(addGroupEntryButton)} />
            </div>
        </div>
    );
}