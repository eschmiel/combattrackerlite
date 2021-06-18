import React from 'react';
import ReactDom from 'react-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrackerTable from './TrackerTable';

it('renders without crashing', () => {
    render(<TrackerTable />);
});


it('generates new table rows and characters', () => {
    const { getByText } = render(<TrackerTable />);

    userEvent.click(getByText('add combatant'));

    const tableRowNames = screen.getAllByRole('textbox', { name: 'name' });
    const tableRowInits = screen.getAllByRole('textbox', { name: 'init' });
    const tableRowHps = screen.getAllByRole('textbox', { name: 'hp' });
    const tableRowAcs = screen.getAllByRole('textbox', { name: 'ac' });
    const tableRowNotes = screen.getAllByRole('textbox', { name: 'notes' });

    expect(tableRowNames).toHaveLength(2);
    expect(tableRowInits).toHaveLength(2);
    expect(tableRowHps).toHaveLength(2);
    expect(tableRowAcs).toHaveLength(2);
    expect(tableRowNotes).toHaveLength(2);

    expect(tableRowNames[1]).toHaveValue('Default Character');
    expect(tableRowInits[1]).toHaveValue('99');
    expect(tableRowHps[1]).toHaveValue('10');
    expect(tableRowAcs[1]).toHaveValue('10');
    expect(tableRowNotes[1]).toHaveValue('notey notey notes');
})


it('Changes the data in a Tracker Table Row', () => {
    const { getByRole } = render(<TrackerTable />);

    const nameInput = getByRole('textbox', { name: 'name' });
    const initInput = getByRole('textbox', { name: 'init' });
    const hpInput = getByRole('textbox', { name: 'hp' });
    const acInput = getByRole('textbox', { name: 'ac' });
    const notesInput = getByRole('textbox', { name: 'notes' });

    
    userEvent.type(nameInput, '{selectall}{del}Bob');
    userEvent.type(initInput, '{selectall}{del}14');
    userEvent.type(hpInput, '{selectall}{del}15');
    userEvent.type(acInput, '{selectall}{del}16');
    userEvent.type(notesInput, "{selectall}{del}Here's a note about Bob");
    
    expect(nameInput).toHaveValue('Bob');
    expect(initInput).toHaveValue('14');
    expect(hpInput).toHaveValue('15');
    expect(acInput).toHaveValue('16');
    expect(notesInput).toHaveValue("Here's a note about Bob");
});


it('only accepts numbers for init, hp and ac', () => {
    const { getByRole } = render(<TrackerTable />);

    const initInput = getByRole('textbox', { name: 'init' });
    const hpInput = getByRole('textbox', { name: 'hp' });
    const acInput = getByRole('textbox', { name: 'ac' });

    userEvent.type(initInput, 'j');
    userEvent.type(hpInput, 'j');
    userEvent.type(acInput, 'j');

    expect(initInput).toHaveValue('99');
    expect(hpInput).toHaveValue('10');
    expect(acInput).toHaveValue('10');
});