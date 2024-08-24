import React from 'react'

import { Roboto } from 'next/font/google'

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
})

export default function Button(props) {
    const { text, dark, full, clickHandler } = props;

    return (
        <button onClick={clickHandler} className={'rounded-full overflow-hidden duration-200 hover:opacity-60 border-2 border-solid border-yellow ' + (dark ? ' text-white calmingBlue ' : ' text-yellow-600 ') + (full ? ' grid place-items-center w-full ' : ' ')}>
            <p className={'px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 ' + roboto.className}>{text}</p>
        </button>
    );
}