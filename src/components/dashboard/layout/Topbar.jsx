import { Bell, Menu, Search } from 'lucide-react';
import React from 'react';
import UserMenu from './UserMenu';

const Topbar = ({onMenuClick, user, role}) => {
    return (
        <div>
            <header className="flex h-16 shrink-0 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-6">
                <button onClick={onMenuClick} className="text-slate-500 lg:hidden">
                    <Menu className="size-6" />
                </button>

                <div className="hidden max-w-md flex-1 items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 sm:flex">
                    <Search className="size-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                    />
                </div>

                <div className="ml-auto flex items-center gap-4">
                    <button className="relative text-slate-500 hover:text-brand-700">
                        <Bell className="size-6" />
                        <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-red-600" />
                    </button>
                    <UserMenu user={user} role={role} />
                </div>
            </header>
        </div>
    );
};

export default Topbar;