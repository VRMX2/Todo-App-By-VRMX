import React from 'react';
import { Calendar, Clock, MapPin, MoreHorizontal, Edit, Trash2, Plus } from 'lucide-react';

export default function Appointments() {
    const appointments = [
        { id: 1, patient: 'John Smith', doctor: 'Dr. Anderson', date: 'Feb 5, 2025', time: '10:00 AM', type: 'Checkup', status: 'Confirmed' },
        { id: 2, patient: 'Emma Johnson', doctor: 'Dr. Martinez', date: 'Feb 5, 2025', time: '11:30 AM', type: 'Follow-up', status: 'Confirmed' },
        { id: 3, patient: 'Michael Brown', doctor: 'Dr. Anderson', date: 'Feb 5, 2025', time: '2:00 PM', type: 'Consultation', status: 'Pending' },
        { id: 4, patient: 'Sarah Williams', doctor: 'Dr. Wilson', date: 'Feb 6, 2025', time: '9:00 AM', type: 'Checkup', status: 'Confirmed' },
        { id: 5, patient: 'David Lee', doctor: 'Dr. Martinez', date: 'Feb 6, 2025', time: '3:30 PM', type: 'Procedure', status: 'Confirmed' },
    ];

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1>Appointments</h1>
                    <p className="subtitle">Schedule and manage patient appointments</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Plus size={20} />
                    Schedule Appointment
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map((apt) => (
                    <div key={apt.id} className="glass-card p-5 relative hover:translate-y-[-4px] transition-transform duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg m-0 text-[var(--text-main)]">{apt.patient}</h3>
                                <div className="text-sm text-[var(--text-muted)]">{apt.doctor}</div>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${apt.status === 'Confirmed' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                }`}>
                                {apt.status}
                            </span>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-3 text-sm text-[var(--text-main)]">
                                <Calendar size={16} className="text-[var(--primary)]" />
                                <span>{apt.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[var(--text-main)]">
                                <Clock size={16} className="text-[var(--primary)]" />
                                <span>{apt.time}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-[var(--text-main)]">
                                <span className="w-4 h-4 rounded-full border border-[var(--primary)] flex items-center justify-center text-[10px] font-bold text-[var(--primary)]">T</span>
                                <span>Type: {apt.type}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t border-[var(--glass-border)]">
                            <button className="flex-1 btn bg-white border border-[var(--glass-border)] text-sm py-2 hover:bg-gray-50 flex items-center justify-center gap-2">
                                <Edit size={14} /> Edit
                            </button>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
