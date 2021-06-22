import React, { useState, useRef, useEffect, useReducer } from 'react';
import TrackerTableLabelRow from './TrackerTableLabelRow';
import TrackerTableRow from './TrackerTableRow';
import Character from './Character';

export interface TrackerTableRowData {
    rowKey: number;
    characterKey: number;
};

interface TrackerTableState {
    rowKeyGenerator: number;
    characterKeyGenerator: number;
    trackerTableRowData: TrackerTableRowData[];
    characterData: Character[];
}

interface ChangeCharacterPayload {
    targetCharacterKey: number;
    targetProperty: string;
    newValue: string | number;
}

interface AddCombatantPayload {
    newTrackerTableRowData: TrackerTableRowData[];
    newCharacterData: Character[];
}

export type ActionType =
    | { type: 'changeCharacter'; payload: ChangeCharacterPayload }
    | { type: 'addCombatant'; payload: AddCombatantPayload };


const initialState: TrackerTableState = {
    rowKeyGenerator: 1,
    characterKeyGenerator: 1,
    trackerTableRowData: [{ rowKey: 0, characterKey: 0 }],
    characterData: [new Character(0)]
};


function changeCharacter(characterData: Character[], { targetCharacterKey, targetProperty, newValue }: ChangeCharacterPayload): Character[] {
    
    let targetIndex = characterData.findIndex((data) => targetCharacterKey === data.characterKey);

    let newCharacterData: Character[] = [];
    characterData.forEach((data) => newCharacterData.push(data));

    switch (targetProperty) {
        case 'name': {            
            if(typeof newValue == 'string')
                newCharacterData[targetIndex].name = newValue;
            break;
        }
        case 'init': {
            let convertedNewValue = Number(newValue);
            if (!isNaN(convertedNewValue))
                newCharacterData[targetIndex].init = convertedNewValue;
            break;
        }
        case 'hp': {
            let convertedNewValue = Number(newValue);
            if (!isNaN(convertedNewValue))
                newCharacterData[targetIndex].hp = convertedNewValue;
            break;
        }
        case 'ac': {
            let convertedNewValue = Number(newValue);
            if (!isNaN(convertedNewValue))
                newCharacterData[targetIndex].ac = convertedNewValue;
            break;
        }
        case 'notes': {
            if (typeof newValue == 'string')
                newCharacterData[targetIndex].notes = newValue;
            break;
        }
    }

    return newCharacterData;
}

function sortCombatants(characterData: Character[], trackerTableRowData: TrackerTableRowData[]) {
    let sortedCharacters: Character[] = [];
    characterData.forEach((data) => sortedCharacters.push(data));

    sortedCharacters.sort((characterA, characterB) => characterA.init - characterB.init);

    let newTrackerTableRowData: TrackerTableRowData[] = [];
    trackerTableRowData.forEach((data) => newTrackerTableRowData.push(data));

    sortedCharacters.forEach((character, characterIndex) => newTrackerTableRowData[characterIndex].characterKey = character.characterKey);

    return newTrackerTableRowData;
}


function reducer(state: TrackerTableState, action: ActionType): TrackerTableState {
    switch (action.type) {
        case 'changeCharacter':
            let newCharacterData = changeCharacter(state.characterData, action.payload);
            let newTrackerTableRowData = sortCombatants(state.characterData, state.trackerTableRowData);

            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: newTrackerTableRowData,
                characterData: newCharacterData
            };

        case 'addCombatant':
            return {
                rowKeyGenerator: state.rowKeyGenerator + 1,
                characterKeyGenerator: state.characterKeyGenerator + 1,
                trackerTableRowData: action.payload.newTrackerTableRowData,
                characterData: action.payload.newCharacterData
            };
        default:
            throw new Error();
    }
}

export default function TrackerTable() {

    const [state, dispatch] = useReducer(reducer, initialState);

    function getNewCharacterData(targetCharacterKey: number, targetProperty: string, newValue: string | number) {
        let action: ActionType = {
            type: 'changeCharacter',
            payload: {
                targetCharacterKey: targetCharacterKey,
                targetProperty: targetProperty,
                newValue: newValue
            }
        };
        dispatch(action);
    }

    function generateTrackerTableRows() {
        let trackerTableRows = state.trackerTableRowData.map((rowData: TrackerTableRowData) => {

            let rowCharacterData = state.characterData.find((charData: Character) => rowData.characterKey === charData.characterKey);

            if (rowCharacterData)
                return <TrackerTableRow key={rowData.rowKey} rowKey={rowData.rowKey} characterData={rowCharacterData} changeCharacter={getNewCharacterData}/>
        });

        return trackerTableRows;
    }

    function addCombatant() {
        let newTrackerTableRowData: TrackerTableRowData[] = [];
        state.trackerTableRowData.forEach((data: TrackerTableRowData) => newTrackerTableRowData.push(data));

        let newCharacterData: Character[] = [];
        state.characterData.forEach((data: Character) => newCharacterData.push(data));

        const newTrackerTableRowDataEntry: TrackerTableRowData = { rowKey: state.rowKeyGenerator, characterKey: state.characterKeyGenerator };
        const newCharacterDataEntry: Character = new Character(state.characterKeyGenerator);

        newTrackerTableRowData.push(newTrackerTableRowDataEntry);
        newCharacterData.push(newCharacterDataEntry);

        dispatch({ type: 'addCombatant', payload: { newTrackerTableRowData: newTrackerTableRowData, newCharacterData: newCharacterData } });
    }

    return (
        <div id='trackerTable'>
            <TrackerTableLabelRow />
            {generateTrackerTableRows()}
            <div style={{ width: '100px', margin: '50px auto', border: '1px solid black' }} onClick={addCombatant}>add combatant</div>
        </div>
    );
};