import {Roboto} from "next/font/google";
import { baseRating, gradients } from '@/utils'

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
            <div className='grid grid-cols-5 gap-4'>
                <button className='mr-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-left"></i></button>
                <p className={'text-center col-span-3 capitalized whitespace-nowrap textGradient ' + roboto.className}></p>
                <button className='ml-auto text-indigo-400 text-lg sm:text-xl duration-200 hover:opacity-60'><i className="fa-solid fa-circle-chevron-right"></i></button>
            </div>
            <div className='flex flex-col overflow-hidden gap-1 py-4 sm:py-6 md:py-10'>
   return (
    <p> wip </p>
    )
}