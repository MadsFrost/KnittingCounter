import React from 'react';

const Intro = () => {
    return (
        <div className='w-full h-full'>
            <h1 className='text-pink-700 font-medium text-lg'>App Funktioner:</h1>
            <ul>
                <li>1. Der kan holdes styr på strikke prosjekter</li>
                <li>2. Styr på tælling af alt under hele prosjektet ved brug af nye omgangstællere</li>
            </ul>
            <h1 className='text-pink-700 font-medium text-lg'>Du kan downloade websiden som en app ved at følge dette billede (i iPhone Safari):</h1>
            <div className='grid grid-cols-1'>
                <img src="https://www.howtogeek.com/wp-content/uploads/2020/04/tap_share_iphone.png?trim=1,1&bg-color=000&pad=1,1" />
                <img src="https://www.howtogeek.com/wp-content/uploads/2020/04/add_to_home_screen_iphone.png?trim=1,1&bg-color=000&pad=1,1" />
            </div>
        </div>
    )
}

export default Intro;