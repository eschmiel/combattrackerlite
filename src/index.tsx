import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import './css/main.css';
import './css/trackerTable.css';
import Header from './Header';
import TrackerTable from './TrackerTable';
import Notepad from './notepad';


ReactDOM.render(
  <React.StrictMode>
        <Header />
        <TrackerTable />
        <Notepad />
  </React.StrictMode>,
  document.getElementById('root')
);