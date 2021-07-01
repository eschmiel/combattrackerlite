import React from 'react';
import ReactDom from 'react-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TrackerTable from '../TrackerTable';
    

it('renders without crashing', () => {
    render(<TrackerTable />);
});


it('generates new table rows and characters', () => {
    const { getByAltText } = render(<TrackerTable />);

    userEvent.click(getByAltText('Button for adding new combatant'));

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

    expect(tableRowNames[1]).toHaveValue('');
    expect(tableRowInits[1]).toHaveValue('0');
    expect(tableRowHps[1]).toHaveValue('10');
    expect(tableRowAcs[1]).toHaveValue('10');
    expect(tableRowNotes[1]).toHaveValue('');
});


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
    /*
    userEvent.type(nameInput, '{selectall}{del}Default Character'); //cleanup doesn't reset state from reducers when components unmount. Seems to be a testing-library bug
    userEvent.type(initInput, '{selectall}99');//these calls reset the state manually
    userEvent.type(hpInput, '{selectall}{del}10');
    userEvent.type(acInput, '{selectall}{del}10');
    userEvent.type(notesInput, "{selectall}{del}notey notey notes");*/
});


it('only accepts numbers for init, hp and ac', () => {
    const { getByRole } = render(<TrackerTable />);

    const initInput = getByRole('textbox', { name: 'init' });
    const hpInput = getByRole('textbox', { name: 'hp' });
    const acInput = getByRole('textbox', { name: 'ac' });

    userEvent.type(initInput, 'j');
    userEvent.type(hpInput, 'j');
    userEvent.type(acInput, 'j');

    expect(initInput).toHaveValue('0');
    expect(hpInput).toHaveValue('10');
    expect(acInput).toHaveValue('10');
});

it('sorts rowData by initiative value', () => {
    const { getAllByRole } =  render(<TrackerTable />);

    userEvent.dblClick(screen.getByAltText('Button for adding new combatant'));

    let characterNumber = 1;
    getAllByRole('textbox', { name: 'name' }).forEach((textbox) => {
        userEvent.type(textbox, ' #' + characterNumber);
        console.log(characterNumber);
        characterNumber++;
    });

    let initiativeNumber = 3;
    screen.getAllByRole('textbox', { name: 'init' }).forEach((textbox) => {
        userEvent.type(textbox, '{selectall}{del}' + initiativeNumber);   
        initiativeNumber--;
    })

    screen.getAllByRole('textbox', { name: 'init' }).forEach((textbox) => {
        initiativeNumber++;
        waitFor(() => { expect(textbox).toHaveValue(initiativeNumber.toString()) });
    })
});