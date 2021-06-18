import React from 'react';
import CharacterEntry from './CharacterEntry';
import { CharacterData } from './TrackerTable';

interface TrackerTableRowProps {
    rowKey: number;
    characterData: CharacterData;
}

export default function TrackerTableRow({ rowKey, characterData }: TrackerTableRowProps) {
    return (
        <div>
            <CharacterEntry character={characterData.character} changeCharacter={characterData.changeCharacter} />
        </div>
    );
};