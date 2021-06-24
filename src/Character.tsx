export interface CharacterInterface {
    characterKey: number;
    name: string;
    init: number;
    hp: number;
    ac: number;
    notes: string;
    subCharacters: SubCharacter[];
    subCharacterKeyGenerator: number;
};

export interface SubCharacter {
    subCharacterKey: number;
    name: string;
    hp: number;
    ac: number;
    notes: string;
}

export default class Character implements CharacterInterface {
    characterKey: number;
    name: string;
    init: number;
    hp: number;
    ac: number;
    notes: string;
    subCharacters: SubCharacter[];
    subCharacterKeyGenerator: number;

    constructor(characterKey: number) {
        this.characterKey = characterKey;
        this.name = 'Default Character';
        this.init = 99;
        this.hp = 10;
        this.ac = 10;
        this.notes = 'notey notey notes';
        this.subCharacters = [];
        this.subCharacterKeyGenerator = 1;
    }

    addSubCharacter() {
        let newSubCharacter: SubCharacter = {
            subCharacterKey: this.subCharacterKeyGenerator,
            name: this.name + ' #' + this.subCharacterKeyGenerator,
            hp: this.hp,
            ac: this.ac,
            notes: ''
        };
        this.subCharacters.push(newSubCharacter);
        this.subCharacterKeyGenerator++;
    }
}