import React from 'react';
import CharacterEntry from './CharacterEntry';
import { ActionType } from './TrackerTable';
import Character from './Character';

interface TrackerTableRowProps {
    rowKey: number;
    characterData: Character;
    changeCharacter: (targetCharacterKey: number, targetProperty: string, newValue: string | number) => void;
}

export default function TrackerTableRow({ rowKey, characterData, changeCharacter }: TrackerTableRowProps) {
    return (
        <div className='trackerTableRow'>
            <CharacterEntry character={characterData} changeCharacter={changeCharacter} />
        </div>
    );
};