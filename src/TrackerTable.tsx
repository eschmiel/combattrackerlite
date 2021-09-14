import React, { useReducer, useState } from 'react';
import * as TrackerTableTypes from './TrackerTableTypes';
import * as Reducer from './TrackerTableReducer';
import * as ManageTrackerTableData from './ManageTrackerTableData';
import TrackerTableLabelRow from './TrackerTableLabelRow';
import TrackerTableRow, { MainEntryRowTypes, SubEntryRowTypes } from './TrackerTableRow';
import Character from './Character';
import AddEntryButton from './img/addGroupEntryButtonLight.svg';
import HighlightAddEntryButton from './img/addGroupEntryButton.svg';


const initialState: TrackerTableTypes.TrackerTableState = {
    rowKeyGenerator: 1,
    characterKeyGenerator: 1,
    trackerTableRowData: [{ rowKey: 0, characterKey: 0 }],
    characterData: [new Character(0)]
};


////Component
export default function TrackerTable() {

    const [addCombatantButton, changeAddCombatantButton] = useState(AddEntryButton);

    const [state, dispatch] = useReducer(Reducer.reducer, initialState);

    function getNewCharacterData(targetCharacterKey: number, targetProperty: string, newValue: string | number) {
        let newCharacterData = ManageTrackerTableData.changeCharacter(state.characterData, targetCharacterKey, targetProperty, newValue);
        dispatch({ type: 'changeCharacter', payload: newCharacterData });
    }

    function getNewSubCharacterData(targetCharacterKey: number, targetSubCharacterKey: number, targetProperty: string, newValue: string | number) {

        let changeSubCharacterData = {
            targetCharacterKey: targetCharacterKey,
            targetSubCharacterKey: targetSubCharacterKey,
            targetProperty: targetProperty,
            newValue: newValue
        }

        let newCharacterData = ManageTrackerTableData.changeSubCharacter(state.characterData, changeSubCharacterData);
        dispatch({ type: 'changeSubCharacter', payload: newCharacterData });
    }

    function addCombatant() {
        let addCombatantPayload = ManageTrackerTableData.addCombatant(state);
        dispatch({ type: 'addCombatant', payload: addCombatantPayload});
    }

    function addSubCombatant(targetCharacterKey: number) {
        let addSubCombatantPayload = ManageTrackerTableData.addSubCombatant(state.characterData, targetCharacterKey);
        dispatch({ type: 'addSubCombatant', payload: addSubCombatantPayload });
    }

    function removeCombatant(targetRowKey: number) {
        let removeCombatantPayload = ManageTrackerTableData.removeCombatant(state, targetRowKey);
        if(removeCombatantPayload)
            dispatch({type: 'removeCombatant', payload: removeCombatantPayload});     
    }

    function removeSubCombatant(targetCharacterKey: number, targetSubCharacterKey: number) {
        let removeSubCombatantPayload = ManageTrackerTableData.removeSubCombatant(state.characterData, targetCharacterKey, targetSubCharacterKey);
        dispatch({ type: 'removeSubCombatant', payload: removeSubCombatantPayload });
    }

    function sortCombatants() {
        let newTrackerTableRowData = ManageTrackerTableData.sortCombatants(state.characterData, state.trackerTableRowData);
        dispatch({ type: 'sortCombatants', payload: newTrackerTableRowData });
    }


    function generateTrackerTableRows() {
        let rowKeyGenerator = 0;

        let trackerTableRows: JSX.Element[] = [];

        state.trackerTableRowData.forEach((rowData: TrackerTableTypes.TrackerTableRowData) => {

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