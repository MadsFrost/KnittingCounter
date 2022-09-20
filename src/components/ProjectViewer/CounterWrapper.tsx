import React from 'react';

const CounterWrapper = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
    return (
        <div className='w-full h-full grid grid-cols-2 grid-gap-4'>
            {children}
        </div>
    )
}

export default CounterWrapper;