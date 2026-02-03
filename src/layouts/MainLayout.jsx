import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import {
    LayoutDashboard,
    Users,
    Calendar,
    FileText,
    Stethoscope,
    Settings,
    LogOut,
    Menu,
    X,
    Bell,
    Search
} from 'lucide-react';

export default function MainLayout() {
    const { user, role } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    const navItems = [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/patients', label: 'Patients', icon: Users },
        { path: '/appointments', label: 'Appointments', icon: Calendar },
        { path: '/medical-records', label: 'Medical Records', icon: FileText },
        { path: '/staff', label: 'Staff', icon: Stethoscope },
    ];

    return (
        <div className="flex h-screen bg-[var(--bg-gradient-end)] text-[var(--text-main)] overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white/80 backdrop-blur-xl border-r border-[var(--glass-border)] 
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    lg:relative lg:translate-x-0
                `}
                style={{
                    background: 'var(--glass-bg)',
                    boxShadow: 'var(--glass-shadow)'
                }}
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center px-6 border-b border-[var(--glass-border)]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] flex items-center justify-center text-white shadow-lg shadow-[var(--primary-glow)]">
                            <span className="font-bold text-xl">✚</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-tight" style={{ fontSize: '1.25rem', margin: 0, background: 'linear-gradient(to right, var(--text-main), var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>ENAC Medical</h1>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden ml-auto p-2 text-[var(--text-muted)] hover:text-[var(--primary)]"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `
                                flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] transition-all duration-200
                                ${isActive
                                    ? 'bg-[var(--primary-glow)] text-[var(--primary)] font-semibold shadow-md'
                                    : 'text-[var(--text-muted)] hover:bg-black/5 hover:text-[var(--text-main)]'}
                            `}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile (Bottom Sidebar) */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[var(--glass-border)]">
                    <div className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-black/5">
                        <div className="w-10 h-10 rounded-full bg-[var(--primary-light)] flex items-center justify-center text-white font-bold">
                            {user?.displayName?.[0] || user?.email?.[0]?.toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold truncate text-[var(--text-main)]">{user?.displayName || 'User'}</p>
                            <p className="text-xs text-[var(--text-muted)] truncate">{role || 'Staff'}</p>
                        </div>
                        <button onClick={handleSignOut} className="p-2 text-[var(--text-muted)] hover:text-red-500 transition-colors">
                            <LogOut size={18} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Topbar */}
                <header className="h-20 px-8 flex items-center justify-between border-b border-[var(--glass-border)] bg-white/50 backdrop-blur-sm z-10 w-full"
                    style={{ background: 'rgba(255,255,255,0.5)' }}>

                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden p-2 text-[var(--text-muted)]"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex-1 px-8 hidden md:block">
                        <div className="relative max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={18} />
                            <input
                                type="text"
                                placeholder="Search patients, records..."
                                className="w-full pl-10 pr-4 py-2 rounded-full border border-[var(--glass-border)] bg-white/50 focus:outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-glow)] transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <button className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
                            <Settings size={20} />
                        </button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-8 bg-[var(--bg-gradient-end)]">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
