import React from 'react';

export default function TrackerTableLabelRow() {
    return (
        <div id='trackerTableLabelRow'>
            <div id='nameLabel'>Name</div>
            <div className='numberLabel'>Init.</div>
            <div className='numberLabel'>HP</div>
            <div className='numberLabel'>AC</div>
            <div id='notesLabel'>Notes</div>
        </div>
    );
};