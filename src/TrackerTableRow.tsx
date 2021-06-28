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
    }
};


export default function TrackerTableRow(props: MainEntryProps | SubEntryProps) {
    
    return (
        <div className='trackerTableRow'>
            {    
                props.entryProps.rowType === 'CharacterEntry' ? <CharacterEntry entryProps={props.entryProps} /> :
                props.entryProps.rowType === 'GroupEntry' ? <GroupEntry entryProps={props.entryProps} /> :
                props.entryProps.rowType === 'SubCharacterEntry' ? <SubCharacterEntry entryProps={props.entryProps} /> : ''
            }        
        </div>
    );
};