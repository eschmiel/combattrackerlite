import Character from './Character';
import * as Reducer from './TrackerTableReducer';
import * as TrackerTableTypes from './TrackerTableTypes';

export function deepCloneCharacterData(characterData: Character[]) {
    let newCharacterData: Character[] = [];
    characterData.forEach((data, dataIndex) => {
        newCharacterData.push(new Character(data.characterKey));

        data.subCharacters.forEach((subCharacterData) => newCharacterData[dataIndex].subCharacters.push(Object.assign({}, subCharacterData)));

        newCharacterData[dataIndex].name = data.name;
        newCharacterData[dataIndex].init = data.init;
        newCharacterData[dataIndex].hp = data.hp;
        newCharacterData[dataIndex].ac = data.ac;
        newCharacterData[dataIndex].notes = data.notes;
        newCharacterData[dataIndex].subCharacterKeyGenerator = data.subCharacterKeyGenerator;
    });

    return newCharacterData;
}

export function changeCharacter(characterData: Character[], targetCharacterKey: number, targetProperty: string, newValue: string | number): Character[] {

    let targetIndex = characterData.findIndex((data) => targetCharacterKey === data.characterKey);

    let newCharacterData = deepCloneCharacterData(characterData);

    switch (targetProperty) {
        case 'name': {
            if (typeof newValue == 'string')
                newCharacterData[targetIndex].name = newValue;
            break;
        }
        case 'init': {
            let convertedNewValue = Number(newValue);
            if (!isNaN(convertedNewValue))
                newCharacterData[targetIndex].init = convertedNewValue;
            break;
        }
        case 'hp': {
            let convertedNewValue = Number(newValue);
            if (!isNaN(convertedNewValue))
                newCharacterData[targetIndex].hp = convertedNewValue;
            break;
        }
        case 'ac': {
            let convertedNewValue = Number(newValue);
            if (!isNaN(convertedNewValue))
                newCharacterData[targetIndex].ac = convertedNewValue;
            break;
        }
        case 'notes': {
            if (typeof newValue == 'string')
                newCharacterData[targetIndex].notes = newValue;
            break;
        }
    }

    return newCharacterData;
}

export function changeSubCharacter(characterData: Character[], { targetCharacterKey, targetSubCharacterKey, targetProperty, newValue }: Reducer.ChangeSubCharacterPayload): Character[] {

    let targetCharacterIndex = characterData.findIndex((data) => targetCharacterKey === data.characterKey);

    let newCharacterData = deepCloneCharacterData(characterData);

    let targetSubCharacterIndex = newCharacterData[targetCharacterIndex].subCharacters.findIndex((data) => data.subCharacterKey === targetSubCharacterKey);

    switch (targetProperty) {
        case 'name': {
            if (typeof newValue == 'string')
                newCharacterData[targetCharacterIndex].subCharacters[targetSubCharacterIndex].name = newValue;
            break;
        }
        case 'hp': {
            let convertedNewValue = Number(newValue);
            if (!isNaN(convertedNewValue))
                newCharacterData[targetCharacterIndex].subCharacters[targetSubCharacterIndex].hp = convertedNewValue;
            break;
        }
        case 'ac': {
            let convertedNewValue = Number(newValue);
            if (!isNaN(convertedNewValue))
                newCharacterData[targetCharacterIndex].subCharacters[targetSubCharacterIndex].ac = convertedNewValue;
            break;
        }
        case 'notes': {
            if (typeof newValue == 'string')
                newCharacterData[targetCharacterIndex].subCharacters[targetSubCharacterIndex].notes = newValue;
            break;
        }
    }

    return newCharacterData;
}

export function sortCombatants(characterData: Character[], trackerTableRowData: TrackerTableTypes.TrackerTableRowData[]) {
    let sortedCharacters = deepCloneCharacterData(characterData);

    sortedCharacters.sort((characterA, characterB) => characterB.init - characterA.init);

    let newTrackerTableRowData: TrackerTableTypes.TrackerTableRowData[] = [];
    trackerTableRowData.forEach((data) => newTrackerTableRowData.push(Object.assign({}, data)));

    sortedCharacters.forEach((character, characterIndex) => newTrackerTableRowData[characterIndex].characterKey = character.characterKey);

    return newTrackerTableRowData;
}


export function addCombatant(state: TrackerTableTypes.TrackerTableState): Reducer.CombatantPayload {
    let newTrackerTableRowData: TrackerTableTypes.TrackerTableRowData[] = [];
    state.trackerTableRowData.forEach((data: TrackerTableTypes.TrackerTableRowData) => newTrackerTableRowData.push(Object.assign({}, data)));

    let newCharacterData = deepCloneCharacterData(state.characterData);

    const newTrackerTableRowDataEntry: TrackerTableTypes.TrackerTableRowData = { rowKey: state.rowKeyGenerator, characterKey: state.characterKeyGenerator };
    const newCharacterDataEntry: Character = new Character(state.characterKeyGenerator);

    newTrackerTableRowData.push(newTrackerTableRowDataEntry);
    newCharacterData.push(newCharacterDataEntry);

    return({ newTrackerTableRowData, newCharacterData });
}


export function addSubCombatant(currentCharacterData: Character[], targetCharacterKey: number): Character[] {
    let newCharacterData = deepCloneCharacterData(currentCharacterData);

    let targetCombatantIndex = newCharacterData.findIndex((data) => data.characterKey === targetCharacterKey);

    newCharacterData[targetCombatantIndex].addSubCharacter();

    return (newCharacterData);
}


export function removeCombatant(state: TrackerTableTypes.TrackerTableState, targetRowKey: number): Reducer.CombatantPayload | undefined {
    let targetRowIndex = state.trackerTableRowData.findIndex((data) => data.rowKey === targetRowKey);

    if (targetRowIndex !== -1) {
        let newTrackerTableRowData: TrackerTableTypes.TrackerTableRowData[] = [];
        let newCharacterData = deepCloneCharacterData(state.characterData);

        let targetCharacterKey: number = state.trackerTableRowData[targetRowIndex].characterKey;
        let targetCharacterIndex: number = newCharacterData.findIndex((data) => data.characterKey === targetCharacterKey);

        state.trackerTableRowData.forEach((data, currentIndex) => { if (currentIndex !== targetRowIndex) newTrackerTableRowData.push(Object.assign({}, data)); });
        newCharacterData.splice(targetCharacterIndex, 1);

        return ({ newCharacterData, newTrackerTableRowData });
    }
}

export function removeSubCombatant(currentCharacterData: Character[], targetCharacterKey: number, targetSubCharacterKey: number): Character[] {
    let targetCharacterIndex = currentCharacterData.findIndex((data) => data.characterKey === targetCharacterKey);
    let targetSubCharacterIndex = currentCharacterData[targetCharacterIndex].subCharacters.findIndex((data) => data.subCharacterKey === targetSubCharacterKey);

    let newCharacterData = deepCloneCharacterData(currentCharacterData);

    newCharacterData[targetCharacterIndex].subCharacters.splice(targetSubCharacterIndex, 1);

    return (newCharacterData);
}
