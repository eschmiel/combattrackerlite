import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Header from './Header';
import './main.css';
import CharacterEntry from './CharacterEntry';

const testCharacter = {
    characterKey: 1,
    name: 'Test-o',
    init: 99,
    hp: 50,
    ac: 18,
    notes: 'This is a test note'
};

ReactDOM.render(
  <React.StrictMode>
        <Header />
        <CharacterEntry character={testCharacter} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
