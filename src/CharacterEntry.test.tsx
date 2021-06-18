import React from 'react';
import ReactDom from 'react-dom';
import { render } from '@testing-library/react';
import CharacterEntry from './CharacterEntry';

const mockChange = jest.fn();

const testCharacter = {
    characterKey: 1,
    name: 'Test-o',
    init: 99,
    hp: 50,
    ac: 18,
    notes: 'This is a test note'
};

it('renders without crashing', () => {
    render(<CharacterEntry character={testCharacter} changeCharacter={mockChange} />);
});

it('displays the correct data', () => {
    const { getByRole } = render(<CharacterEntry character={testCharacter} changeCharacter={mockChange} />);

    expect(getByRole('textbox', { name: 'name' })).toHaveValue('Test-o');
    expect(getByRole('textbox', { name: 'init' })).toHaveValue('99');
    expect(getByRole('textbox', { name: 'hp' })).toHaveValue('50');
    expect(getByRole('textbox', { name: 'ac' })).toHaveValue('18');
    expect(getByRole('textbox', { name: 'notes' })).toHaveValue('This is a test note');
});