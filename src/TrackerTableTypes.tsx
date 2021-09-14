import Character from './Character';

export interface TrackerTableRowData {
    rowKey: number;
    characterKey: number;
};

export interface TrackerTableState {
    rowKeyGenerator: number;
    characterKeyGenerator: number;
    trackerTableRowData: TrackerTableRowData[];
    characterData: Character[];
}