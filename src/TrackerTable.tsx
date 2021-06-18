import React, { useState, useRef, useEffect } from 'react';
import TrackerTableLabelRow from './TrackerTableLabelRow';
import TrackerTableRow from './TrackerTableRow';
import Character from './Character';

export interface TrackerTableRowData {
    rowKey: number;
    characterKey: number;
};

export interface CharacterData {
    character: Character;
    changeCharacter: (event: React.FormEvent<HTMLInputElement>) => void;
};


export default function TrackerTable() {
 
    const defaultTrackerTableRowData: TrackerTableRowData[] = [{
        rowKey: 0,
        characterKey: 0
    }];

    const defaultCharacterData: CharacterData[] = [{ character: new Character(0), changeCharacter: setChangeCharacter(0)}];
    

    const [rowKeyGenerator, changeRowKeyGenerator] = useState(1);
    const [characterKeyGenerator, changeCharacterKeyGenerator] = useState(1);
    const [trackerTableRowData, changeTrackerTableRowData] = useState(defaultTrackerTableRowData);
    const [characterData, changeCharacterData] = useState(defaultCharacterData);

    const rowKeyGeneratorRef = useRef(rowKeyGenerator);
    const characterKeyGeneratorRef = useRef(characterKeyGenerator);
    const trackerTableRowDataRef = useRef(trackerTableRowData);
    const characterDataRef = useRef(characterData);

    useEffect(() => {
        rowKeyGeneratorRef.current = rowKeyGenerator;
        characterKeyGeneratorRef.current = characterKeyGenerator;
        trackerTableRowDataRef.current = trackerTableRowData;
        characterDataRef.current = characterData;
    })


    function setChangeCharacter(characterKey: number) {
        return (event: React.FormEvent<HTMLInputElement>): void => {
            let eventTargetName = event.currentTarget.attributes.getNamedItem('name');
            let name; 
            if (eventTargetName)
                name = eventTargetName.value;

            let targetIndex = characterDataRef.current.findIndex((data) => characterKey === data.character.characterKey);

            let newCharacterData: CharacterData[] = [];
            characterDataRef.current.forEach((data) => newCharacterData.push(data));

            switch (name) {
                case 'name': {
                    let newName = event.currentTarget.value;
                    newCharacterData[targetIndex].character.name = newName;
                    break;
                }
                case 'init': {
                    let newInit = Number(event.currentTarget.value);                   
                    if(!isNaN(newInit))
                        newCharacterData[targetIndex].character.init = newInit;
                    break;
                }
                case 'hp': {
                    let newHp = Number(event.currentTarget.value);
                    if (!isNaN(newHp))
                        newCharacterData[targetIndex].character.hp = newHp;
                    break;
                }
                case 'ac': {
                    let newAc = Number(event.currentTarget.value);
                    if (!isNaN(newAc))
                        newCharacterData[targetIndex].character.ac = newAc;
                    break;
                }
                case 'notes': {
                    let newNotes = event.currentTarget.value;
                    newCharacterData[targetIndex].character.notes = newNotes;
                    break;
                }
            }

            changeCharacterData(newCharacterData);
        }
    }


    function generateTrackerTableRows() {
        let trackerTableRows = trackerTableRowData.map((rowData) => {

            let rowCharacterData = characterData.find((charData) => rowData.characterKey === charData.character.characterKey);
            if (rowCharacterData) 
                return <TrackerTableRow key={rowData.rowKey} rowKey={rowData.rowKey} characterData={rowCharacterData} />
        });

        return trackerTableRows;
    }

    function addCombatant() {
        let newTrackerTableRowData: TrackerTableRowData[] = [];
        trackerTableRowData.forEach((data) => newTrackerTableRowData.push(data));

        let newCharacterData: CharacterData[] = [];
        characterData.forEach((data) => newCharacterData.push(data));

        const newTrackerTableRowDataEntry: TrackerTableRowData = { rowKey: rowKeyGenerator, characterKey: characterKeyGenerator };
        const newCharacterDataEntry: CharacterData = { character: new Character(characterKeyGenerator), changeCharacter: setChangeCharacter(characterKeyGenerator) };

        newTrackerTableRowData.push(newTrackerTableRowDataEntry);
        newCharacterData.push(newCharacterDataEntry);

        changeRowKeyGenerator(rowKeyGenerator + 1);
        changeCharacterKeyGenerator(characterKeyGenerator + 1);
        changeTrackerTableRowData(newTrackerTableRowData);
        changeCharacterData(newCharacterData);
    }

    return (
        <div id='trackerTable'>
            <TrackerTableLabelRow />
            {generateTrackerTableRows()}
            <div style={{ width: '100px', margin: '50px auto', border: '1px solid black' }} onClick={addCombatant}>add combatant</div>
        </div>
    );
};