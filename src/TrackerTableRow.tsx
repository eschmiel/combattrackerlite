import React, { useState } from 'react';
import CharacterEntry from './CharacterEntry';
import Character from './Character';
import GroupEntry from './GroupEntry';
import SubCharacterEntry from './SubCharacterEntry';


interface TrackerTableRowProps {
    rowKey: number;
    characterData: Character;
    changeCharacter: (targetCharacterKey: number, targetProperty: string, newValue: string | number) => void;
    deleteRow: (rowKey: number) => void;
    sortCombatants: () => void;
    addSubCombatant: (targetCharacterKey: number) => void;
    changeSubCharacter: (targetCharacterKey: number, targetSubCharacterKey: number, targetProperty: string, newValue: string | number) => void;
    rowType: string;
    currentSubCharacterIndex: number;
}

export default function TrackerTableRow({ rowKey, characterData, changeCharacter, deleteRow, sortCombatants, addSubCombatant, rowType, changeSubCharacter, currentSubCharacterIndex }: TrackerTableRowProps) {
    const [hover, changeHover] = useState(false);

    function toggleHover() {
        changeHover(!hover);
    }

    function removeCharacter() {
        deleteRow(rowKey);
    }

    return (
        <div onMouseEnter={toggleHover} onMouseLeave={toggleHover} className='trackerTableRow'>
            {
                rowType === 'CharacterEntry' ? <CharacterEntry character={characterData} changeCharacter={changeCharacter} removeCharacter={removeCharacter} sortCombatants={sortCombatants} addSubCombatant={addSubCombatant} /> :
                rowType === 'GroupEntry' ? <GroupEntry character={characterData} changeCharacter={changeCharacter} removeCharacter={removeCharacter} sortCombatants={sortCombatants} addSubCombatant={addSubCombatant} /> :
                rowType === 'SubCharacterEntry' ? <SubCharacterEntry subCharacter={characterData.subCharacters[currentSubCharacterIndex]} changeSubCharacter={changeSubCharacter} characterKey={characterData.characterKey} /> :
            '' }
            
        </div>
    );
};