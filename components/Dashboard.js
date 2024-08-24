'use client';
import React, { useEffect, useState } from "react";
import { Roboto } from "next/font/google";
import Calendar from './Calendar';
import { useAuth } from '@/context/AuthContext';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import Loading from './Loading';
import Login from './Login';

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

export default function Dashboard() {
    const { currentUser, userDataObj, setUserDataObj, loading } = useAuth();
    const [data, setData] = useState({});
    const today = new Date();

    function calculateStats() {
        let totalDays = 0;
        let totalMoods = 0;
        for (let year in data) {
            for (let month in data[year]) {
                for (let day in data[year][month]) {
                    let mood = data[year][month][day];
                    totalDays++;
                    totalMoods += mood;
                }
            }
        }
        return { numDays: totalDays, avgMood: totalMoods / totalDays };
    }

    const stats = {
        ...calculateStats(),
        remainingTime: `${23 - today.getHours()}H ${60 - today.getMinutes()}M`,
    };

    async function updateMood(mood) {
        const day = today.getDate();
        const month = today.getMonth();
        const year = today.getFullYear();

        try {
            const updatedData = { ...userDataObj };
            if (!updatedData[year]) {
                updatedData[year] = {};
            }
            if (!updatedData[year][month]) {
                updatedData[year][month] = {};
            }

            updatedData[year][month][day] = mood;
            // update local state
            setData(updatedData);
            // update global state
            setUserDataObj(updatedData);
            // update firebase
            const docRef = doc(db, 'users', currentUser.uid);
            await setDoc(docRef, {
                [year]: {
                    [month]: {
                        [day]: mood
                    }
                }
            }, { merge: true });
        } catch (error) {
            console.error('Failed to update mood: ', error.message);
        }
    }

    const moodIcons = {
        '&*@#$': '😭',
        'Sad': '🥲',
        'Neutral': '😶',
        'Good': '😊',
        'Elated': '😍',
    };

    useEffect(() => {
        if (!currentUser || !userDataObj) return;
        setData(userDataObj);
    }, [currentUser, userDataObj]);

    if (loading) {
        return <Loading />;
    }

    if (!currentUser) {
        return <Login />;
    }

    return (
        <div className='flex flex-col flex-1 gap-8 sm:gap-12 md:gap-16'>
            <div className='grid grid-cols-3 text-indigo-500 p-4 gap-4 rounded-lg bg-sky-50'>
                {Object.keys(stats).map((key, index) => (
                    <div key={index} className='flex flex-col gap-1 sm:gap-2'>
                        <p className='font-medium capitalize text-xs sm:text-sm truncate'>{key.replace(/_/g, ' ')}</p>
                        <p className={'text-base sm:text-lg truncate ' + roboto.className}>
                            {stats[key]}{key === 'numDays' ? ' 🔥' : ''}
                        </p>
                    </div>
                ))}
            </div>

            <h4 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + roboto.className}>
                How are you <span className='textGradient'>feeling</span> today?
            </h4>
            <div className='flex items-stretch flex-wrap gap-4'>
                {Object.keys(moodIcons).map((mood, index) => (
                    <button
                        onClick={() => {
                            const moodValue = index + 1;
                            updateMood(moodValue);
                        }}
                        className={'p-4 px-5 rounded-2xl calmingBlueShadow duration-200 bg-sky-50 hover:bg-sky-100 text-center flex flex-col items-center gap-2 flex-1'}
                        key={index}
                    >
                        <p className='text-4xl sm:text-5xl md:text-6xl'>{moodIcons[mood]}</p>
                        <p className={'text-indigo-500 text-xs sm:text-sm md:text-base ' + roboto.className}>{mood}</p>
                    </button>
                ))}
            </div>
            <Calendar completeData={data} handleSetMood={updateMood} />
        </div>
    );
}
