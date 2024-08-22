import {Roboto} from "next/font/google";
const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});
export default function Calandar() {
    const months = {
        'January': 'Jan',
        'February': 'Feb',
        'March': 'Mar',
        'April': 'Apr',
        'May': 'May',
        'June': 'Jun',
        'July': 'Jul',
        'August': 'Aug',
        'September': 'Sept',
        'October': 'Oct',
        'November': 'Nov',
        'December': 'Dec'
    }
    const monthsArr = Object.keys(months)
    const now = new Date()
    const dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return (
        <div className='flex flex-col gap-2'>
            {/* Month navigation */}
            <div className='grid grid-cols-5 gap-4'>
                <button>{/* Left arrow */}</button>
                <p className={'text-center col-span-3 capitalized whitespace-nowrap textGradient ' + fugaz.className}>{/* Month and Year */}</p>
                <button>{/* Right arrow */}</button>
            </div>

            {/* Calendar grid */}
            <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
                {/* Rows of days */}
                {[/* Array of rows */].map((rowIndex) => (
                    <div key={rowIndex} className='grid grid-cols-7 gap-1'>
                        {dayList.map((dayOfWeek, dayOfWeekIndex) => {
                            // Render day cell
                            return <div key={dayOfWeekIndex}>{/* Day number and styles */}</div>
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}