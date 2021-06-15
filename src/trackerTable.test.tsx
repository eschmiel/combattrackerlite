import React from 'react';
import ReactDom from 'react-dom';
import { render } from '@testing-library/react';
import TrackerTable from './TrackerTable';

it('renders without crashing', () => {
    render(<TrackerTable />);
});
