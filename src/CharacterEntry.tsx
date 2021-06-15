import React from 'react';

interface Character {
    characterKey: number;
    name: string;
    init: number;
    hp: number;
    ac: number;
    notes: string;
}

interface CharacterEntryProps {
    character: Character;

}

export default function CharacterEntry({ character }: CharacterEntryProps) {
    return (
        <div>
            <input type='text' aria-label='name' name='name' value={character.name}/>
            <input type='text' aria-label='init' value={character.init}/>
            <input type='text' aria-label='hp' value={character.hp}/>
            <input type='text' aria-label='ac' value={character.ac}/>
            <input type='text' aria-label='notes' value={character.notes}/>
        </div>

    );
}