import React from 'react';
import {Character} from './Character';

interface ChangeCharacterDataFunctions {
    changeName: (newName: string) => void;
    changeInit: (newInit: number) => void;
    changeHp: (newHp: number) => void;
    changeAc: (newAc: number) => void;
    changeNotes: (newNotes: string) => void;
}

interface CharacterEntryProps {
    character: Character;
    //changeCharacterDataFunctions: ChangeCharacterDataFunctions;
}

export default function CharacterEntry({ character }: CharacterEntryProps) {
    return (
        <div className='characterEntry'>
            <input type='text' className='characterName' aria-label='name' name='name' value={character.name}/>
            <input type='text' className='characterNumber' aria-label='init' value={character.init}/>
            <input type='text' className='characterNumber' aria-label='hp' value={character.hp}/>
            <input type='text' className='characterNumber' aria-label='ac' value={character.ac}/>
            <input type='text' className='characterNotes' aria-label='notes' value={character.notes}/>
        </div>

    );
}