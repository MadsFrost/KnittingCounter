import React from 'react';
import { KnitCounter } from '../../types';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { GrPowerReset, GrTrash } from 'react-icons/gr';

interface CounterProps {
    knitCounter: KnitCounter;
    onUpdate: (knitCounter: KnitCounter) => void;
    onDelete: (knitCounter: KnitCounter) => void;
}
const Counter: React.FC<CounterProps> = (props) => {
    const { name, cycle, id, maxCycle, minCycle, image } = props.knitCounter;

    const handleIncrement = () => {
        if (cycle + 1 <= maxCycle) {
            props.onUpdate({
                ...props.knitCounter, cycle: cycle + 1
            })
        }
    }

    const handleDecrement = () => {
        if (cycle - 1 >= 0) {
            props.onUpdate({
                ...props.knitCounter, cycle: cycle - 1
            })
        }
    }

    const handleReset = () => {
        props.onUpdate({
            ...props.knitCounter, cycle: minCycle
        })
    }

    const onDelete = () => {
        props.onDelete(props.knitCounter);
    }
    return (
        <div className='w-full  border-md flex flex-col p-4'>
            <div className='flex flex-col items-center'>
                <span className='pl-3 py-2 text-pink-500 text-xl font-medium'>{name}</span>
                <span className='text-pink-600 font-large text-3xl'>{cycle}/{maxCycle}</span>
                <div className='flex flex-row my-4 bg-pink-400 items-center'>
                    <span onClick={onDelete} className='p-4 hover:bg-pink-500 rounded-md cursor-pointer'><GrTrash className='text-xl'/></span>
                    <span onClick={handleReset} className='p-4 hover:bg-pink-500 rounded-md cursor-pointer'><GrPowerReset className='text-xl' /></span>
                </div>

            </div>
            <div className='flex flex-row justify-between w-full mt-4'>
                <button
                onClick={handleIncrement}
                disabled={cycle === maxCycle} 
                className='disabled:opacity-25 rounded-tl-xl rounded-bl-xl h-full w-2/4 bg-pink-400 w-full flex h-[40px] justify-center items-center'><FiPlus size='20px' /><span className='text-lg font-medium'>1</span></button>
                <button
                onClick={handleDecrement}
                disabled={cycle === 0}
                className='disabled:opacity-25 rounded-tr-xl rounded-br-xl h-full w-2/4 bg-pink-600 w-full flex h-[40px] justify-center items-center'><FiMinus size='20px' /><span className='text-lg font-medium'>1</span></button>
            </div>
        </div>
    )
}

export default Counter;