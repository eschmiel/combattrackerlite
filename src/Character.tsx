export interface CharacterInterface {
    characterKey: number;
    name: string;
    init: number;
    hp: number;
    ac: number;
    notes: string;
};

export default class Character implements CharacterInterface {
    characterKey: number;
    name: string;
    init: number;
    hp: number;
    ac: number;
    notes: string;

    constructor(characterKey: number) {
        this.characterKey = characterKey;
        this.name = 'Default Character';
        this.init = 99;
        this.hp = 10;
        this.ac = 10;
        this.notes = 'notey notey notes';
    }
}