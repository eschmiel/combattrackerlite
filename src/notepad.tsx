import React from 'react';

export default function Notepad() {
    return (
        <div className='notepad'>
            <div className='notepadLabel'>
                <p>Notepad</p>
            </div>
            <textarea cols={90} rows={14}/>
        </div>

    );
}