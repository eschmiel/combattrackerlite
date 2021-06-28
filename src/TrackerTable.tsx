import React, { useReducer } from 'react';
import TrackerTableLabelRow from './TrackerTableLabelRow';
import TrackerTableRow, { MainEntryRowTypes, SubEntryRowTypes } from './TrackerTableRow';
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

interface ChangeSubCharacterPayload extends ChangeCharacterPayload {
    targetSubCharacterKey: number;
}

interface AddCombatantPayload {
    newTrackerTableRowData: TrackerTableRowData[];
    newCharacterData: Character[];
}

interface RemoveCombatantPayload {
    newTrackerTableRowData: TrackerTableRowData[];
    newCharacterData: Character[];
}

export type ActionType =
    | { type: 'changeCharacter'; payload: ChangeCharacterPayload }
    | { type: 'addCombatant'; payload: AddCombatantPayload }
    | { type: 'removeCombatant'; payload: RemoveCombatantPayload }
    | { type: 'sortCombatants' }
    | { type: 'addSubCombatant', payload: Character[] }
    | { type: 'changeSubCharacter', payload: ChangeSubCharacterPayload };


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

function changeSubCharacter(characterData: Character[], { targetCharacterKey, targetSubCharacterKey, targetProperty, newValue }: ChangeSubCharacterPayload): Character[] {

    let targetCharacterIndex = characterData.findIndex((data) => targetCharacterKey === data.characterKey);

    let newCharacterData: Character[] = [];
    characterData.forEach((data) => newCharacterData.push(data));

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
                        addSubCombatant: () => addSubCombatant(rowCharacter.characterKey)
                    
                };

                
                if (rowCharacter.subCharacters.length) {
                    mainEntryProps.rowType = MainEntryRowTypes.GROUP;

                    trackerTableRows.push(<TrackerTableRow key={rowKeyGenerator} entryProps={mainEntryProps} />);
                    rowKeyGenerator++;

                    rowCharacter.subCharacters.forEach((subCharacter) => {

                        let subEntryProps = {
                                rowType: SubEntryRowTypes.SUBCHARACTER,
                                subCharacter: subCharacter,
                                changeSubCharacter: (targetProperty: string, newValue: string | number) =>
                                    getNewSubCharacterData(rowCharacter.characterKey, subCharacter.subCharacterKey, targetProperty, newValue)
                            
                        };

                        trackerTableRows.push(<TrackerTableRow key={rowKeyGenerator} entryProps={subEntryProps} />);
                        rowKeyGenerator++;
                    
                     });
                }
                else {
                    
                    trackerTableRows.push(<TrackerTableRow key={rowKeyGenerator} entryProps={mainEntryProps} />);

                    rowKeyGenerator++;
                }
               }
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


    function removeCombatant(targetRowKey: number) {
        let targetRowIndex = state.trackerTableRowData.findIndex((data) => data.rowKey === targetRowKey);
        //let targetCharacterKey: number;

        if (targetRowIndex !== -1) {
            let newTrackerTableRowData: TrackerTableRowData[] = [];
            let newCharacterData: Character[] = [];

            let targetCharacterKey: number = state.trackerTableRowData[targetRowIndex].characterKey;

            state.trackerTableRowData.forEach((data, currentIndex) => { if (currentIndex !== targetRowIndex) newTrackerTableRowData.push(data); });
            state.characterData.forEach((data) => { if (data.characterKey !== targetCharacterKey) newCharacterData.push(data); });

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

    function addSubCombatant(targetCharacterKey: number) {
        let newCharacterData: Character[] = [];
        state.characterData.forEach((data) => newCharacterData.push(data));

        let targetCombatantIndex = newCharacterData.findIndex((data) => data.characterKey === targetCharacterKey);
        newCharacterData[targetCombatantIndex].addSubCharacter();

        let action: ActionType = {
            type: 'addSubCombatant',
            payload: newCharacterData
        };

        dispatch(action);
    }

    function sortCombatants() {
        dispatch({ type: 'sortCombatants' });
    }

    return (
        <div id='trackerTable'>
            <TrackerTableLabelRow />
            {generateTrackerTableRows()}
            <div style={{ width: '100px', margin: '50px auto', border: '1px solid black' }} onClick={addCombatant}>add combatant</div>
        </div>
    );
};