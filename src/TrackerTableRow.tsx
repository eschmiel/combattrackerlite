import React from 'react';
import CharacterEntry from './entries/CharacterEntry';
import Character, { SubCharacter } from './Character';
import GroupEntry from './entries/GroupEntry';
import SubCharacterEntry from './entries/SubCharacterEntry';
import './css/TrackerTableRow.css';
import './css/MainEntryTrackerTableRow.css';
import './css/SubEntryTrackerTableRow.css';

export enum MainEntryRowTypes {
    CHARACTER = 'CharacterEntry',
    GROUP = 'GroupEntry'
}

export enum SubEntryRowTypes {
    SUBCHARACTER = 'SubCharacterEntry'
}

export interface MainEntryProps {
    entryProps: {
        rowType: MainEntryRowTypes;
        characterData: Character;
        changeCharacter: (targetProperty: string, newValue: string | number) => void;
        deleteRow: () => void;
        sortCombatants: () => void;
        addSubCombatant: () => void;
        addCombatant: () => void;
    }
};

export interface SubEntryProps {
    entryProps: {
        rowType: SubEntryRowTypes,
        subCharacter: SubCharacter,
        changeSubCharacter: (targetProperty: string, newValue: string | number) => void;
        removeSubCombatant: (targetSubCharacterKey: number) => void;
    }
};

interface SubEntryTrackerTableRowProps extends SubEntryProps {
    rowNumber: number;
}

interface MainEntryTrackerTableRowProps extends MainEntryProps {
    rowNumber: number;
}

type TrackerTableRowStyle = {
    backgroundColor?: string;

};

export default function TrackerTableRow(props: MainEntryTrackerTableRowProps | SubEntryTrackerTableRowProps) {


    let trackerTableRowClass = 'trackerTableRow mainEntry';
    if (props.entryProps.rowType === 'SubCharacterEntry')
        trackerTableRowClass = 'trackerTableRow subEntry';

    let trackerTableRowStyle: TrackerTableRowStyle = {};

    if (props.rowNumber % 2 === 0)
        trackerTableRowStyle.backgroundColor = '#ffffff';
    

    return (
        <div className={trackerTableRowClass} style={trackerTableRowStyle}>
            {    
                props.entryProps.rowType === 'CharacterEntry' ? <CharacterEntry entryProps={props.entryProps} /> :
                props.entryProps.rowType === 'GroupEntry' ? <GroupEntry entryProps={props.entryProps} /> :
                props.entryProps.rowType === 'SubCharacterEntry' ? <SubCharacterEntry entryProps={props.entryProps} /> : ''
            }        
        </div>
    );
};