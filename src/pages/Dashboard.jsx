import React from 'react';
import { Users, Calendar, Activity, FileText, Clock, Plus } from 'lucide-react';

export default function Dashboard() {
    return (
        <div className="animate-fade-in">
            <div className="mb-8">
                <h1>Welcome back, Dr. Anderson</h1>
                <p className="subtitle">Here's what's happening with your patients today</p>
            </div>

            {/* Scale: 0-100% full width flex container for stats */}
            <div className="stats-grid">
                <div className="stat-card glass-card">
                    <div className="icon-wrapper">
                        <Users size={24} />
                    </div>
                    <div>
                        <div className="stat-value text-green-500">1,234</div>
                        <div className="stat-label">Total Patients</div>
                        <div className="text-xs text-green-500 font-bold mt-2">+12% from last month</div>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="icon-wrapper">
                        <Calendar size={24} />
                    </div>
                    <div>
                        <div className="stat-value text-[var(--primary)]">8</div>
                        <div className="stat-label">Today's Appointments</div>
                        <div className="text-xs text-[var(--text-muted)] mt-2">2 canceled</div>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="icon-wrapper">
                        <FileText size={24} />
                    </div>
                    <div>
                        <div className="stat-value text-blue-500">23</div>
                        <div className="stat-label">Pending Records</div>
                        <div className="text-xs text-blue-500 font-bold mt-2">Needs review</div>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="icon-wrapper">
                        <Activity size={24} />
                    </div>
                    <div>
                        <div className="stat-value text-purple-500">156</div>
                        <div className="stat-label">Active Cases</div>
                    </div>
                </div>
            </div>

            <div className="flex gap-8 flex-col lg:flex-row">
                <div className="flex-1">
                    <h2 className="mb-4">Recent Activity</h2>
                    <div className="glass-card p-6 flex flex-col gap-4">
                        {[
                            { name: 'John Smith', action: 'Scheduled appointment for COVID-19 booster', time: '2 hours ago', type: 'Appointment', color: 'bg-blue-100 text-blue-600' },
                            { name: 'Emma Johnson', action: 'Medical record updated with lab results', time: '4 hours ago', type: 'Record', color: 'bg-purple-100 text-purple-600' },
                            { name: 'Michael Brown', action: 'Completed routine health checkup', time: '6 hours ago', type: 'Visit', color: 'bg-green-100 text-green-600' },
                            { name: 'Sarah Williams', action: 'Added clinical notes for diabetes management', time: '8 hours ago', type: 'Note', color: 'bg-amber-100 text-amber-600' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-black/5 rounded-xl transition-colors cursor-pointer border-b border-[var(--glass-border)] last:border-0">
                                <div className="w-10 h-10 rounded-full bg-[var(--bg-gradient-end)] flex items-center justify-center font-bold text-[var(--text-muted)] border border-[var(--glass-border)]">
                                    {item.name[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h4 className="font-semibold text-[var(--text-main)] m-0">{item.name}</h4>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${item.color}`}>
                                            {item.type}
                                        </span>
                                    </div>
                                    <p className="text-sm text-[var(--text-muted)] m-0 mt-1">{item.action}</p>
                                </div>
                                <div className="text-xs text-[var(--text-muted)] whitespace-nowrap">
                                    {item.time}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-80">
                    <h2 className="mb-4">Quick Actions</h2>
                    <div className="glass-card p-4 flex flex-col gap-3">
                        <button className="btn-primary w-full flex items-center justify-center gap-2 py-3 rounded-[var(--radius-md)]">
                            <Calendar size={18} />
                            Schedule Appointment
                        </button>
                        <button className="btn w-full bg-white border border-[var(--glass-border)] hover:bg-gray-50 flex items-center justify-center gap-2 py-3 rounded-[var(--radius-md)]">
                            <FileText size={18} />
                            Add Medical Record
                        </button>
                        <button className="btn w-full bg-white border border-[var(--glass-border)] hover:bg-gray-50 flex items-center justify-center gap-2 py-3 rounded-[var(--radius-md)]">
                            <Users size={18} />
                            Search Patient
                        </button>
                    </div>

                    <h2 className="mb-4 mt-8">Next Appointments</h2>
                    <div className="glass-card p-4 flex flex-col gap-4">
                        {[
                            { name: 'John Smith', time: '10:00 AM', type: 'Checkup' },
                            { name: 'Emma Johnson', time: '11:30 AM', type: 'Follow-up' },
                            { name: 'Michael Brown', time: '2:00 PM', type: 'Consultation' },
                        ].map((apt, i) => (
                            <div key={i} className="flex gap-3 items-start border-l-2 border-[var(--primary)] pl-3">
                                <Clock size={16} className="text-[var(--primary)] mt-1" />
                                <div>
                                    <div className="font-semibold text-sm">{apt.name}</div>
                                    <div className="text-xs text-[var(--text-muted)]">{apt.time} • {apt.type}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
