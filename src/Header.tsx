import React from 'react';
import combatTrackerLiteLogo from './combatTrackerLiteLogo.svg';

export default function Header() {

    return (
        < div id={'header'}> 
            <img src={combatTrackerLiteLogo} alt='Combat Tracker Lite Logo' height='117px' />
            <a href='https://www.eschmiel.github.io/CombatTrackerLite' >
                <div id='aboutButton'>ABOUT</div>
            </a>

        </div>

        //set hover to color : 323232
    );
}