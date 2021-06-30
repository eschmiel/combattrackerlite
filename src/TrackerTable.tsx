import React, { useReducer, useState } from 'react';
import TrackerTableLabelRow from './TrackerTableLabelRow';
import TrackerTableRow, { MainEntryRowTypes, SubEntryRowTypes } from './TrackerTableRow';
import Character from './Character';
import AddEntryButton from './addGroupEntryButtonLight.svg';
import HighlightAddEntryButton from './addGroupEntryButton.svg';

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

interface ChangeSubCharacterPayload extends ChangeCharacterPayload {
    targetSubCharacterKey: number;
}

interface CombatantPayload {
    newTrackerTableRowData: TrackerTableRowData[];
    newCharacterData: Character[];
}


export type ActionType =
    | { type: 'changeCharacter'; payload: ChangeCharacterPayload }
    | { type: 'addCombatant'; payload: CombatantPayload }
    | { type: 'removeCombatant'; payload: CombatantPayload }
    | { type: 'sortCombatants' }
    | { type: 'addSubCombatant', payload: Character[] }
    | { type: 'changeSubCharacter', payload: ChangeSubCharacterPayload }
    | { type: 'removeSubCombatant', payload: Character[] };


const initialState: TrackerTableState = {
    rowKeyGenerator: 1,
    characterKeyGenerator: 1,
    trackerTableRowData: [{ rowKey: 0, characterKey: 0 }],
    characterData: [new Character(0)]
};

//Helper functions for state management
function deepCloneCharacterData(characterData: Character[]) {
    let newCharacterData: Character[] = [];
    characterData.forEach((data, dataIndex) => {
        newCharacterData.push(new Character(data.characterKey));

        data.subCharacters.forEach((subCharacterData) => newCharacterData[dataIndex].subCharacters.push(Object.assign({}, subCharacterData)));

        newCharacterData[dataIndex].name = data.name;
        newCharacterData[dataIndex].init = data.init;
        newCharacterData[dataIndex].hp = data.hp;
        newCharacterData[dataIndex].ac = data.ac;
        newCharacterData[dataIndex].notes = data.notes;
        newCharacterData[dataIndex].subCharacterKeyGenerator = data.subCharacterKeyGenerator;
    });

    return newCharacterData;
}

function changeCharacter(characterData: Character[], { targetCharacterKey, targetProperty, newValue }: ChangeCharacterPayload): Character[] {
    
    let targetIndex = characterData.findIndex((data) => targetCharacterKey === data.characterKey);

    let newCharacterData= deepCloneCharacterData(characterData);

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

function changeSubCharacter(characterData: Character[], { targetCharacterKey, targetSubCharacterKey, targetProperty, newValue }: ChangeSubCharacterPayload): Character[] {

    let targetCharacterIndex = characterData.findIndex((data) => targetCharacterKey === data.characterKey);

    let newCharacterData = deepCloneCharacterData(characterData);

    let targetSubCharacterIndex = newCharacterData[targetCharacterIndex].subCharacters.findIndex((data) => data.subCharacterKey === targetSubCharacterKey);

    switch (targetProperty) {
        case 'name': {
            if (typeof newValue == 'string')
                newCharacterData[targetCharacterIndex].subCharacters[targetSubCharacterIndex].name = newValue;
            break;
        }
        case 'hp': {
            let convertedNewValue = Number(newValue);
            if (!isNaN(convertedNewValue))
                newCharacterData[targetCharacterIndex].subCharacters[targetSubCharacterIndex].hp = convertedNewValue;
            break;
        }
        case 'ac': {
            let convertedNewValue = Number(newValue);
            if (!isNaN(convertedNewValue))
                newCharacterData[targetCharacterIndex].subCharacters[targetSubCharacterIndex].ac = convertedNewValue;
            break;
        }
        case 'notes': {
            if (typeof newValue == 'string')
                newCharacterData[targetCharacterIndex].subCharacters[targetSubCharacterIndex].notes = newValue;
            break;
        }
    }

    return newCharacterData;
}

function sortCombatants(characterData: Character[], trackerTableRowData: TrackerTableRowData[]) {
    let sortedCharacters = deepCloneCharacterData(characterData);

    sortedCharacters.sort((characterA, characterB) => characterB.init - characterA.init);

    let newTrackerTableRowData: TrackerTableRowData[] = [];
    trackerTableRowData.forEach((data) => newTrackerTableRowData.push(Object.assign({}, data)));

    sortedCharacters.forEach((character, characterIndex) => newTrackerTableRowData[characterIndex].characterKey = character.characterKey);

    return newTrackerTableRowData;
}

////
function reducer(state: TrackerTableState, action: ActionType): TrackerTableState {

    switch (action.type) {
        case 'changeCharacter': {
            let newCharacterData = changeCharacter(state.characterData, action.payload);

            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: state.trackerTableRowData,
                characterData: newCharacterData
            };
        }

        case 'changeSubCharacter': {
            let newCharacterData = changeSubCharacter(state.characterData, action.payload);

            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: state.trackerTableRowData,
                characterData: newCharacterData
            };
        }

        case 'addCombatant':
            return {
                rowKeyGenerator: state.rowKeyGenerator + 1,
                characterKeyGenerator: state.characterKeyGenerator + 1,
                trackerTableRowData: action.payload.newTrackerTableRowData,
                characterData: action.payload.newCharacterData
            };

        case 'removeCombatant':
            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: action.payload.newTrackerTableRowData,
                characterData: action.payload.newCharacterData
            };

        case 'sortCombatants':
            let newTrackerTableRowData = sortCombatants(state.characterData, state.trackerTableRowData);

            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: newTrackerTableRowData,
                characterData: state.characterData
            };

        case 'addSubCombatant':
            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: state.trackerTableRowData,
                characterData: action.payload
            };

        case 'removeSubCombatant':
            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: state.trackerTableRowData,
                characterData: action.payload
            };

        default:
            throw new Error();
    }
}

////Component
export default function TrackerTable() {

    const [addCombatantButton, changeAddCombatantButton] = useState(AddEntryButton);

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

    function getNewSubCharacterData(targetCharacterKey: number, targetSubCharacterKey: number, targetProperty: string, newValue: string | number) {
        let action: ActionType = {
            type: 'changeSubCharacter',
            payload: {
                targetCharacterKey: targetCharacterKey,
                targetSubCharacterKey: targetSubCharacterKey,
                targetProperty: targetProperty,
                newValue: newValue
            }
        };
        dispatch(action);
    }


    function addCombatant() {
        let newTrackerTableRowData: TrackerTableRowData[] = [];
        state.trackerTableRowData.forEach((data: TrackerTableRowData) => newTrackerTableRowData.push(Object.assign({}, data)));

        let newCharacterData = deepCloneCharacterData(state.characterData);

        const newTrackerTableRowDataEntry: TrackerTableRowData = { rowKey: state.rowKeyGenerator, characterKey: state.characterKeyGenerator };
        const newCharacterDataEntry: Character = new Character(state.characterKeyGenerator);

        newTrackerTableRowData.push(newTrackerTableRowDataEntry);
        newCharacterData.push(newCharacterDataEntry);

        dispatch({ type: 'addCombatant', payload: { newTrackerTableRowData: newTrackerTableRowData, newCharacterData: newCharacterData } });
    }


    function addSubCombatant(targetCharacterKey: number) {
        let newCharacterData = deepCloneCharacterData(state.characterData);

        let targetCombatantIndex = newCharacterData.findIndex((data) => data.characterKey === targetCharacterKey);
 
        newCharacterData[targetCombatantIndex].addSubCharacter();

        let action: ActionType = {
            type: 'addSubCombatant',
            payload: newCharacterData
        };

        dispatch(action);
    }


    function removeCombatant(targetRowKey: number) {
        let targetRowIndex = state.trackerTableRowData.findIndex((data) => data.rowKey === targetRowKey);

        if (targetRowIndex !== -1) {
            let newTrackerTableRowData: TrackerTableRowData[] = [];
            let newCharacterData = deepCloneCharacterData(state.characterData);

            let targetCharacterKey: number = state.trackerTableRowData[targetRowIndex].characterKey;
            let targetCharacterIndex: number = newCharacterData.findIndex((data) => data.characterKey === targetCharacterKey);

            state.trackerTableRowData.forEach((data, currentIndex) => { if (currentIndex !== targetRowIndex) newTrackerTableRowData.push(Object.assign({}, data)); });
            newCharacterData.splice(targetCharacterIndex, 1);

            let action: ActionType = {
                type: 'removeCombatant',
                payload: {
                    newCharacterData: newCharacterData,
                    newTrackerTableRowData: newTrackerTableRowData
                }
            };

            dispatch(action);
        }
    }

    function removeSubCombatant(targetCharacterKey: number, targetSubCharacterKey: number) {
        let targetCharacterIndex = state.characterData.findIndex((data) => data.characterKey === targetCharacterKey);
        let targetSubCharacterIndex = state.characterData[targetCharacterIndex].subCharacters.findIndex((data) => data.subCharacterKey === targetSubCharacterKey);

        let newCharacterData = deepCloneCharacterData(state.characterData);

        newCharacterData[targetCharacterIndex].subCharacters.splice(targetSubCharacterIndex, 1);

        let action: ActionType = {
            type: 'removeSubCombatant',
            payload: newCharacterData
        };

        dispatch(action);
        console.log(state.characterData);
    }


    function sortCombatants() {
        dispatch({ type: 'sortCombatants' });
    }


    function generateTrackerTableRows() {
        let rowKeyGenerator = 0;

        let trackerTableRows: JSX.Element[] = [];

        state.trackerTableRowData.forEach((rowData: TrackerTableRowData) => {

            let rowCharacterData = state.characterData.find((charData: Character) => rowData.characterKey === charData.characterKey);
            if (rowCharacterData) {

                let rowCharacter = rowCharacterData;

                let mainEntryProps= {
                    
                        rowType: MainEntryRowTypes.CHARACTER,
                        characterData: rowCharacter,
                        deleteRow: () => removeCombatant(rowData.rowKey),
                        changeCharacter: (targetProperty: string, newValue: string | number) =>
                            getNewCharacterData(rowCharacter.characterKey, targetProperty, newValue),
                        sortCombatants: sortCombatants,
                        addSubCombatant: () => addSubCombatant(rowCharacter.characterKey),
                        addCombatant: () => addCombatant()
                    
                };

                
                if (rowCharacter.subCharacters.length) {
                    mainEntryProps.rowType = MainEntryRowTypes.GROUP;

                    trackerTableRows.push(<TrackerTableRow key={rowData.rowKey} entryProps={mainEntryProps} rowNumber={rowKeyGenerator} />);
                    rowKeyGenerator++;

                    rowCharacter.subCharacters.forEach((subCharacter) => {

                        let subEntryProps = {
                                rowType: SubEntryRowTypes.SUBCHARACTER,
                                subCharacter: subCharacter,
                                changeSubCharacter: (targetProperty: string, newValue: string | number) =>
                                    getNewSubCharacterData(rowCharacter.characterKey, subCharacter.subCharacterKey, targetProperty, newValue),
                                removeSubCombatant: (targetSubCharacterKey: number) => removeSubCombatant(rowCharacter.characterKey, targetSubCharacterKey)
                        };

                        trackerTableRows.push(<TrackerTableRow key={rowData.rowKey + (subCharacter.subCharacterKey / 100)} entryProps={subEntryProps} rowNumber={rowKeyGenerator} />);
                        rowKeyGenerator++;
                    
                     });
                }
                else {
                    
                    trackerTableRows.push(<TrackerTableRow key={rowData.rowKey} entryProps={mainEntryProps} rowNumber={rowKeyGenerator}/>);

                    rowKeyGenerator++;
                }
               }
        });

        return trackerTableRows;
    }


    return (
        <div id='trackerTable'>
            <TrackerTableLabelRow />
            {generateTrackerTableRows()}
            <img src={addCombatantButton} onClick={addCombatant} style={{ height: '28px', margin: 'auto', marginTop: '40px', display: 'block', cursor: 'pointer' }} alt='Button for adding new combatant'
                onMouseOver={() => changeAddCombatantButton(HighlightAddEntryButton)} onMouseLeave={() => changeAddCombatantButton(AddEntryButton)}/>
        </div>
    );
};