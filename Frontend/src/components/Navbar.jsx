import { useState } from 'react';
import logo from '../assets/images/logo.png';
export const Navbar = () => {
    const [activeItem, setActiveItem] = useState('Home');
    const [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="flex justify-between items-center px-10 py-4">
            <div className="flex items-center gap-2">
                <img className='w-10' src={logo} alt="" />
                <span className='text-lg font-semibold'>RespireX</span>
            </div>

            <div className="flex gap-2 rounded-full bg-white/30 backdrop-blur-sm p-1.5 shadow-lg">
                {['Home', 'Features', 'Consultancy', 'Contact'].map((item, index) => {
                    return (
                        <button
                            key={index}
                            onClick={() => setActiveItem(item)}
                            className={`px-7 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                                activeItem === item 
                                ? 'bg-white text-primary-blue shadow-md transform scale-105' 
                                : 'bg-secondary-gray text-gray-600 hover:bg-white hover:text-primary-blue hover:shadow-md hover:scale-105'
                            }`}
                        >
                            {item}
                        </button>
                    );
                })}
            </div>

            <div className="flex items-center gap-4">
                <div className="relative">
                    <button 
                        onClick={() => setIsOpen(!isOpen)} 
                        className="flex items-center gap-2"
                    >
                        <div className="w-9 h-9 rounded-full overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1">
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Edit Profile
                            </button>
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Sign Out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};