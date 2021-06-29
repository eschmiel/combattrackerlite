import React from 'react';
import CharacterEntry from './CharacterEntry';
import Character, { SubCharacter } from './Character';
import GroupEntry from './GroupEntry';
import SubCharacterEntry from './SubCharacterEntry';

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
    backgroundColor: string;
    width?: string;
    margin?: string;
};

export default function TrackerTableRow(props: MainEntryTrackerTableRowProps | SubEntryTrackerTableRowProps) {

    let trackerTableRowStyle: TrackerTableRowStyle = {
        backgroundColor: '#ffffff',
    };

    if(props.rowNumber % 2 == 1)
        trackerTableRowStyle.backgroundColor = '#f1f1f1';
/*
    if (props.entryProps.rowType === 'SubCharacterEntry') {

        trackerTableRowStyle.width = '600px';
        trackerTableRowStyle.margin = 'auto';
    }*/
    return (
        <div className='trackerTableRow' style={trackerTableRowStyle}>
            {    
                props.entryProps.rowType === 'CharacterEntry' ? <CharacterEntry entryProps={props.entryProps} /> :
                props.entryProps.rowType === 'GroupEntry' ? <GroupEntry entryProps={props.entryProps} /> :
                props.entryProps.rowType === 'SubCharacterEntry' ? <SubCharacterEntry entryProps={props.entryProps} /> : ''
            }        
        </div>
    );
};