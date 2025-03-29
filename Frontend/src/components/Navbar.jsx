import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import profile from '../assets/icons/profile.svg';
import logo from '../assets/images/logo.png';
import { Bell, ChevronDown, UserCircle, LogOut, Settings, FileText, Zap, Code } from 'lucide-react';

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    // Navigation items with their routes
    const navItems = [
        { 
            name: 'Home', 
            path: '/',
            icon: null
        },
        { 
            name: 'Features', 
            path: '/xray',  // Route to X-ray analysis as main feature
            icon: <Zap className="w-4 h-4" />
        },
        { 
            name: 'API', 
            path: '/apihistory',  // Route to API history
            icon: <Code className="w-4 h-4" />
        },
        { 
            name: 'Documentation', 
            path: '/docs',
            icon: <FileText className="w-4 h-4" />
        },
        { 
            name: 'Upgrade', 
            path: '/upgrade',
            icon: <UserCircle className="w-4 h-4" />
        }
    ];

    // Profile menu items with their routes
    const profileMenuItems = [
        { 
            name: 'Results Dashboard', 
            path: '/results',
            icon: <FileText className="w-4 h-4" />
        },
        { 
            name: 'Account Settings', 
            path: '/settings',
            icon: <Settings className="w-4 h-4" />
        },
        { 
            name: 'API History', 
            path: '/apihistory',
            icon: <Code className="w-4 h-4" />
        }
    ];

    const handleNavigation = (path) => {
        navigate(path);
        setIsOpen(false);
    };

    const handleLogout = () => {
        // Add logout logic here
        navigate('/auth');
        setIsOpen(false);
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo with navigation */}
                    <div 
                        className="flex items-center gap-2.5 cursor-pointer"
                        onClick={() => handleNavigation('/')}
                    >
                        <img className="w-7 h-7" src={logo} alt="RespireX" />
                        <span className="text-lg font-semibold text-blue-950">
                            RespireX
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item, index) => (
                            <button
                                key={index}
                                onClick={() => handleNavigation(item.path)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                                    location.pathname === item.path
                                    ? 'bg-blue-50 text-blue-600' 
                                    : 'text-slate-600 hover:bg-slate-50'
                                }`}
                            >
                                {item.icon && <span className="hidden lg:inline-block">{item.icon}</span>}
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Profile Section */}
                    <div className="flex items-center gap-2">
                        {/* Notification Bell with navigation */}
                        <button 
                            onClick={() => handleNavigation('/results')}
                            className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors relative"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                        </button>

                        <div className="h-6 w-px bg-slate-200 mx-1"></div>

                        {/* Profile Dropdown */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-2 py-1 pl-1 pr-2 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full border-2 border-blue-100 p-[1px]">
                                    <img
                                        src={profile}
                                        alt="Profile"
                                        className="w-full h-full rounded-full"
                                    />
                                </div>
                                <ChevronDown 
                                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                                />
                            </button>

                            {/* Enhanced Dropdown Menu */}
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-md py-1 border border-slate-100">
                                    <div className="px-4 py-3 border-b border-slate-100">
                                        <p className="text-sm font-medium text-blue-950">John Doe</p>
                                        <p className="text-xs text-slate-500">john@example.com</p>
                                    </div>
                                    
                                    <div className="py-1">
                                        {profileMenuItems.map((item, index) => (
                                            <button 
                                                key={index}
                                                onClick={() => handleNavigation(item.path)}
                                                className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-2"
                                            >
                                                {item.icon}
                                                {item.name}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="border-t border-slate-100 py-1">
                                        <button 
                                            onClick={handleLogout}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};