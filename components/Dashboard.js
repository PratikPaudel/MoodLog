import React from "react";
import {Open_Sans, Roboto} from "next/font/google";
const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});
const opensans = Open_Sans({ subsets: ["latin"] });

export default function Dashboard() {
    const moodStats = {
        num_days: 5,
        time_remaining: 3,
        date: (new Date()).toDateString()
    };

    const moods = {
        '&*@#$': '😭',
        'Sad': '🥲',
        'Existing': '😶',
        'Good': '😊',
        'Elated': '😍',
    };

    return (
        <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
            <div className='grid grid-cols-3 bg-indigo-50 text-indigo-500 p-4 gap-4 rounded-lg'>
                {Object.keys(moodStats).map((status, statusIndex) => {
                    return (
                        <div key={statusIndex} className=' flex flex-col gap-1 sm:gap-2'>
                            <p className='font-medium capitalize text-xs sm:text-sm truncate'>{status.replaceAll('_', ' ')}</p>
                            <p className={'text-base sm:text-lg truncate ' + roboto.className}>{moodStats[status]}{status === 'num_days' ? ' 🔥' : ''}</p>
                        </div>
                    );
                })}
            </div>
            <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + roboto.className}>
                How do you <span className='textGradient'>feel</span> today?
            </h4>
            <div className='flex items-stretch flex-wrap gap-4'>
                {Object.keys(moods).map((mood, moodIndex) => {
                    return (
                        <button className={'p-4 px-5 rounded-2xl purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 text-center flex flex-col items-center gap-2 flex-1 '} key={moodIndex}>
                            <p className='text-4xl sm:text-5xl md:text-6xl'>{moods[mood]}</p>
                            <p className={'text-indigo-500 text-xs sm:text-sm md:text-base ' + roboto.className}>{mood}</p>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}