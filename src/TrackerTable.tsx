import React from 'react';
import TrackerTableLabelRow from './TrackerTableLabelRow';
import CharacterEntry from './CharacterEntry';


export default function TrackerTable() {

    const testCharacter = {
        characterKey: 1,
        name: 'Test-o',
        init: 99,
        hp: 50,
        ac: 18,
        notes: 'This is a test note'
    };

    return (
        <div id='trackerTable'>
            <TrackerTableLabelRow />
            <CharacterEntry character={testCharacter} />
        </div>
    );
};