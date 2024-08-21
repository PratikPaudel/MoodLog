import React from "react";
import { Roboto } from 'next/font/google'
import Button from "@/components/Button";

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})
export default function Login() {
    return (
        <div className='flex flex-col flex-1 justify-center items-center gap-4'>
            <h3 className={'text-4xl sm:text-5xl md:text-6xl ' + roboto.className}>Log In</h3>
            <p>You are one step away!</p>
            <input className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none'
                   placeholder='Email'/>
            <input className='w-full max-w-[400px] mx-auto px-3 duration-200 hover:border-indigo-600 focus:border-indigo-600 py-2 sm:py-3 border border-solid border-indigo-400 rounded-full outline-none'
                   placeholder='Password' type='password'/>
            <div className='max-w-[400px] w-full mx-auto'>
                <Button/>
            </div>
            <p className='text-center'> Already have an account?
        </p>
    <button className='text-indigo-600'> Sign in </button>
</div>
)
}