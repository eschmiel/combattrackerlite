import React from 'react';
import ReactDOM from 'react-dom';
import DocumentMeta from 'react-document-meta';
import './css/index.css';
import './css/main.css';
import './css/trackerTable.css';
import Header from './Header';
import TrackerTable from './TrackerTable';
import Notepad from './notepad';

const meta = {
    title: 'Combat Tracker Lite',
    description: 'Combat Tracker Lite is a lightweight browser based tool for helping dungeon masters and game masters run combat encounters in Dungeons and Dragons. It is simple and easy to use. It may also be helpful for other table top rpgs ( ttrpg )',
    canonical: 'https://combattrackerlite.vercel.app/',
    meta: {
        charSet: 'utf-8',
        author: 'Eric Schmiel',
        lang: 'english'
    }
};

ReactDOM.render(
    <React.StrictMode>
        <DocumentMeta {...meta}>
            <Header />
            <TrackerTable />
            <Notepad />
        </DocumentMeta>
  </React.StrictMode>,
  document.getElementById('root')
);