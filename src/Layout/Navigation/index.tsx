import React from 'react';
import { Link } from 'react-router-dom';

interface MobileMenuButtonProps {
    isOpen: boolean;
    setOpen: () => void;
}
const MobileMenuButton = ({ isOpen, setOpen}: MobileMenuButtonProps ) => {
    const genericHamburgerLine = `h-1 w-6 my-1 rounded-full bg-pink-800 transition ease transform duration-300`;
    return (
        <button
            className="flex flex-col h-8 w-8 rounded justify-center items-center group md:hidden"
            onClick={setOpen}
            >
            <div
                className={`${genericHamburgerLine} ${
                isOpen
                    ? "rotate-45 translate-y-3 opacity-50 group-hover:opacity-100"
                    : "opacity-50 group-hover:opacity-100"
                }`}
            />
            <div
                className={`${genericHamburgerLine} ${
                isOpen ? "opacity-0" : "opacity-50 group-hover:opacity-100"
                }`}
            />
            <div
                className={`${genericHamburgerLine} ${
                isOpen
                    ? "-rotate-45 -translate-y-3 opacity-50 group-hover:opacity-100"
                    : "opacity-50 group-hover:opacity-100"
                }`}
            />
        </button>
    )
}
const Navigation = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const mobileCSS = `${isOpen ? '' : 'hidden'} w-full md:block md:w-auto`
    const handleMenuToggle = () => {
        setIsOpen(!isOpen);
    }
    return (
        <nav className="bg-pink-300 border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-pink-300">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="https://www.instagram.com/amaliesstrik/" className="flex items-center px-4">
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-pink-600">Amalie Strik</span>
                </a>
                <MobileMenuButton isOpen={isOpen} setOpen={handleMenuToggle} />
                <div className={mobileCSS} id="navbar-default">
                    <ul className="flex flex-col bg-pink-300 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-lg md:font-large md:border-0 md:bg-pink-300">
                        <Link 
                            onClick={handleMenuToggle}
                            to='/'
                            className="my-1 block py-2 pr-4 pl-3 text-pink-500 hover:text-pink-100 font-medium hover:bg-pink-400 rounded md:bg-transparent md:text-pink-700 md:p-0" aria-current="page">
                            Hvordan virker det?
                        </Link>
                        <Link 
                            onClick={handleMenuToggle}
                            to='/projects'
                            className="my-1 block py-2 pr-4 pl-3 text-pink-500 hover:text-pink-100 font-medium hover:bg-pink-400 rounded md:bg-transparent md:text-pink-700 md:p-0" aria-current="page">
                            Strikkeprosjekter
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navigation;