import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../Header';
import { render } from '@testing-library/react';


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Header />, div);
});

it('renders the logo', () => {
    const { getByRole } = render(<Header />);
    const logo = getByRole('img', { name: 'Combat Tracker Lite Logo' });

    expect(logo).toBeVisible();
    expect(logo.getAttribute('src')).toEqual('combatTrackerLiteLogo.svg');
})

it('renders ABOUT button', () => {
    const { getByRole } = render(<Header />);
    const about = getByRole('link', { name: 'ABOUT' });

    expect(about).toBeInTheDocument();
    expect(about.getAttribute('href')).toEqual('https://eschmiel.github.io/combatTrackerLite');
})