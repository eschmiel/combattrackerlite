import { useState } from 'react';
import { MainEntryProps } from '../TrackerTableRow';
import addGroupEntryButton from '../img/addGroupEntryButtonLight.svg';
import highlightAddGroupEntryButton from '../img/addGroupEntryButton.svg';


export default function CharacterEntry(props: MainEntryProps) {

    let { characterData, changeCharacter, deleteRow, sortCombatants, addSubCombatant, /*addCombatant*/ } = props.entryProps;

    const [addEntryButton, changeAddEntryButton] = useState(addGroupEntryButton); 

    let nameStyle = {
        textDecoration: 'initial',
    };

    if (!characterData.hp)
        nameStyle.textDecoration = 'line-through';
    


    return (
        
        <div className='characterEntry'>
            <input type='text' className='characterName' aria-label='name' name='name' value={characterData.name}
                onChange={(e) => changeCharacter('name', e.currentTarget.value)} style={nameStyle}
                /*onKeyDown={(e) => { if (e.key === "Enter") addCombatant() }}*/ /> 

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
                <img src={addEntryButton} alt='Button for adding sub-entries.' onClick={addSubCombatant}
                    onMouseOver={() => changeAddEntryButton(highlightAddGroupEntryButton)} onMouseLeave={() => changeAddEntryButton(addGroupEntryButton)}                />
            </div>
        </div>
    );
}