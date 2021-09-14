import Character from './Character';
import { TrackerTableRowData, TrackerTableState } from './TrackerTableTypes';

export interface ChangeCharacterPayload {
    targetCharacterKey: number;
    targetProperty: string;
    newValue: string | number;
}

export interface ChangeSubCharacterPayload extends ChangeCharacterPayload {
    targetSubCharacterKey: number;
}

export interface CombatantPayload {
    newTrackerTableRowData: TrackerTableRowData[];
    newCharacterData: Character[];
}


export type ActionType =
    | { type: 'changeCharacter'; payload: Character[] }
    | { type: 'addCombatant'; payload: CombatantPayload }
    | { type: 'removeCombatant'; payload: CombatantPayload }
    | { type: 'sortCombatants'; payload: TrackerTableRowData[]}
    | { type: 'addSubCombatant', payload: Character[] }
    | { type: 'changeSubCharacter', payload: Character[] }
    | { type: 'removeSubCombatant', payload: Character[] };


export function reducer(state: TrackerTableState, action: ActionType): TrackerTableState {

    switch (action.type) {
        case 'changeCharacter': {

            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: state.trackerTableRowData,
                characterData: action.payload
            };
        }

        case 'changeSubCharacter': {

            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: state.trackerTableRowData,
                characterData: action.payload
            };
        }

        case 'addCombatant':
            return {
                rowKeyGenerator: state.rowKeyGenerator + 1,
                characterKeyGenerator: state.characterKeyGenerator + 1,
                trackerTableRowData: action.payload.newTrackerTableRowData,
                characterData: action.payload.newCharacterData
            };

        case 'removeCombatant':
            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: action.payload.newTrackerTableRowData,
                characterData: action.payload.newCharacterData
            };

        case 'sortCombatants':
            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: action.payload,
                characterData: state.characterData
            };

        case 'addSubCombatant':
            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: state.trackerTableRowData,
                characterData: action.payload
            };

        case 'removeSubCombatant':
            return {
                rowKeyGenerator: state.rowKeyGenerator,
                characterKeyGenerator: state.characterKeyGenerator,
                trackerTableRowData: state.trackerTableRowData,
                characterData: action.payload
            };

        default:
            throw new Error();
    }
}