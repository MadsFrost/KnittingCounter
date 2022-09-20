import React from 'react';
import Navigation from './Navigation';

interface LayoutProps {
    children: React.ReactNode | React.ReactNode[];
}
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className='bg-pink-300 w-full h-full flex flex-col'>
            <Navigation />
            <div className='px-6 py-8 md:px-56 w-full h-screen'>
                {children}
            </div>
        </div>

    )
}

export default Layout;