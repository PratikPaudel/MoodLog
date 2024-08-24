'use client'
import { baseRating, gradients } from '@/utils'
import { Roboto } from 'next/font/google'
import React, { useState } from 'react'

const monthLabels = {
    'January': 'Jan', 'February': 'Feb', 'March': 'Mar', 'April': 'Apr',
    'May': 'May', 'June': 'Jun', 'July': 'Jul', 'August': 'Aug',
    'September': 'Sept', 'October': 'Oct', 'November': 'Nov', 'December': 'Dec'
}

const monthNames = Object.keys(monthLabels)
const currentDate = new Date()
const weekdayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

export default function Calendar(props) {
    const { demo, completeData, handleSetMood } = props
    const [currentMonth, setCurrentMonth] = useState(monthNames[currentDate.getMonth()])
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

    const monthIndex = monthNames.indexOf(currentMonth)
    const monthData = completeData?.[currentYear]?.[monthIndex] || {}

    function changeMonth(offset) {
        const newIndex = monthIndex + offset
        if (newIndex < 0) {
            setCurrentYear(prev => prev - 1)
            setCurrentMonth(monthNames[11])
        } else if (newIndex > 11) {
            setCurrentYear(prev => prev + 1)
            setCurrentMonth(monthNames[0])
        } else {
            setCurrentMonth(monthNames[newIndex])
        }
    }

    const firstDay = new Date(currentYear, monthNames.indexOf(currentMonth), 1).getDay()
    const totalDays = new Date(currentYear, monthNames.indexOf(currentMonth) + 1, 0).getDate()
    const totalCells = firstDay + totalDays
    const rows = Math.ceil(totalCells / 7)

    return (
        <div className='flex flex-col gap-2'>
            <div className='grid grid-cols-5 gap-4'>
                <button onClick={() => changeMonth(-1)} className='mr-auto text-orange-400 text-lg sm:text-xl transition-opacity duration-200 hover:opacity-60'>
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <p className={'text-center col-span-3 capitalize whitespace-nowrap ' + roboto.className}>
                    {currentMonth}, {currentYear}
                </p>
                <button onClick={() => changeMonth(1)} className='ml-auto text-orange-400 text-lg sm:text-xl transition-opacity duration-200 hover:opacity-60'>
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
            <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
                {[...Array(rows).keys()].map((row, rowIndex) => (
                    <div key={rowIndex} className='grid grid-cols-7 gap-1'>
                        {weekdayNames.map((dayName, dayIndex) => {
                            let cellIndex = (rowIndex * 7) + dayIndex - (firstDay - 1)
                            let isOutOfMonth = cellIndex > totalDays
                            let isBeforeFirst = rowIndex === 0 && dayIndex < firstDay
                            let showCell = !(isOutOfMonth || isBeforeFirst)

                            let isToday = cellIndex === currentDate.getDate()
                            let bgColor = demo ?
                                gradients.calmingBlue[baseRating[cellIndex]] :
                                cellIndex in monthData ?
                                    gradients.calmingBlue[monthData[cellIndex]] :
                                    'white'

                            return (
                                <div style={{ background: bgColor }}
                                     className={'text-xs sm:text-sm border border-solid p-2 flex items-center gap-2 justify-between rounded-lg ' +
                                         (isToday ? 'border-orange-400' : 'border-orange-100') +
                                         (bgColor === 'white' ? ' text-blue-400' : ' text-white')}
                                     key={dayIndex}>
                                    {showCell ? <p>{cellIndex}</p> : <div />}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}
