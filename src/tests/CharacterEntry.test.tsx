import React from 'react';
import ReactDom from 'react-dom';
import { render } from '@testing-library/react';
import CharacterEntry from '../entries/CharacterEntry';
import { MainEntryProps, MainEntryRowTypes } from '../TrackerTableRow';
import Character from '../Character';

const mockChange = jest.fn();

const testCharacter: MainEntryProps = {
    entryProps: {
        rowType: MainEntryRowTypes.CHARACTER,
        characterData: new Character(0),
        changeCharacter: (targetProperty: string, newValue: string | number) => { },
        deleteRow: () => { },
        sortCombatants: () => { },
        addSubCombatant: () => { },
        addCombatant: () => { },
    }
};

it('renders without crashing', () => {
    render(<CharacterEntry entryProps={testCharacter.entryProps}/>);
});

it('displays the correct data', () => {
    const { getByRole } = render(<CharacterEntry entryProps={testCharacter.entryProps} />);

    expect(getByRole('textbox', { name: 'name' })).toHaveValue('');
    expect(getByRole('textbox', { name: 'init' })).toHaveValue('0');
    expect(getByRole('textbox', { name: 'hp' })).toHaveValue('10');
    expect(getByRole('textbox', { name: 'ac' })).toHaveValue('10');
    expect(getByRole('textbox', { name: 'notes' })).toHaveValue('');
});