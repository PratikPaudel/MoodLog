import React from "react";
import {Roboto, Open_Sans} from 'next/font/google'
import Calendar from "@/components/Calandar";
const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})
const opensans = Open_Sans({ subsets: ["latin"] });

export default function Hero() {
    return (
        <div className='py-4 md:py-10 flex flex-col gap-8 sm:gap-10'>
            <h1 className={'text-5xl sm:text-6xl md:text-7xl text-center ' + roboto.className}><span className='textGradient'>MoodLog</span> helps you track your <span className='textGradient'>daily</span> mood!</h1>
            <p className='text-lg sm:text-xl md:text-2xl text-center w-full mx-auto max-w-[600px]'>Create your mood record and see how you feel on <span className='font-semibold'>every day of every year.</span></p>
            <Calendar demo />
        </div>
    )
}