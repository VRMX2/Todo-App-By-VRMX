import React, { useState } from 'react';
import { Search, Filter, Plus, MoreVertical, Edit, Trash2 } from 'lucide-react';

export default function Patients() {
    const [searchTerm, setSearchTerm] = useState('');

    const patients = [
        { id: 1, name: 'John Smith', email: 'john.smith@email.com', phone: '+1 (555) 123-4567', age: 42, status: 'Active', lastVisit: '2 days ago' },
        { id: 2, name: 'Emma Johnson', email: 'emma.j@email.com', phone: '+1 (555) 234-5678', age: 35, status: 'Active', lastVisit: '1 week ago' },
        { id: 3, name: 'Michael Brown', email: 'm.brown@email.com', phone: '+1 (555) 345-6789', age: 58, status: 'Inactive', lastVisit: '3 weeks ago' },
        { id: 4, name: 'Sarah Williams', email: 'sarah.w@email.com', phone: '+1 (555) 456-7890', age: 28, status: 'Active', lastVisit: '5 days ago' },
        { id: 5, name: 'David Lee', email: 'david.lee@email.com', phone: '+1 (555) 567-8901', age: 51, status: 'Active', lastVisit: 'Today' },
    ];

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1>Patients</h1>
                    <p className="subtitle">Manage and view patient information</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Plus size={20} />
                    Add New Patient
                </button>
            </div>

            <div className="glass-card p-4 mb-6 flex gap-4 items-center">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[var(--glass-border)] bg-white/5 focus:outline-none focus:border-[var(--primary)] text-[var(--text-main)] transition-colors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button className="btn bg-white border border-[var(--glass-border)] flex items-center gap-2 text-[var(--text-main)] hover:bg-gray-50">
                    <Filter size={20} />
                    Filter
                </button>
            </div>

            <div className="glass-card overflow-hidden">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[var(--primary-glow)] bg-opacity-10 text-left">
                            <th className="p-4 font-semibold text-sm text-[var(--text-main)]">Name</th>
                            <th className="p-4 font-semibold text-sm text-[var(--text-main)]">Email</th>
                            <th className="p-4 font-semibold text-sm text-[var(--text-main)]">Phone</th>
                            <th className="p-4 font-semibold text-sm text-[var(--text-main)]">Age</th>
                            <th className="p-4 font-semibold text-sm text-[var(--text-main)]">Status</th>
                            <th className="p-4 font-semibold text-sm text-[var(--text-main)]">Last Visit</th>
                            <th className="p-4 font-semibold text-sm text-[var(--text-main)] text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient) => (
                            <tr key={patient.id} className="border-b border-[var(--glass-border)] hover:bg-black/5 transition-colors">
                                <td className="p-4 font-medium text-[var(--text-main)]">{patient.name}</td>
                                <td className="p-4 text-[var(--text-muted)]">{patient.email}</td>
                                <td className="p-4 text-[var(--text-muted)]">{patient.phone}</td>
                                <td className="p-4 text-[var(--text-main)]">{patient.age}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${patient.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                                        }`}>
                                        {patient.status}
                                    </span>
                                </td>
                                <td className="p-4 text-[var(--text-muted)]">{patient.lastVisit}</td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors">
                                            <Edit size={16} />
                                        </button>
                                        <button className="p-2 text-[var(--text-muted)] hover:text-red-500 transition-colors">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="p-4 flex justify-between items-center text-sm text-[var(--text-muted)]">
                    <span>Showing 1 to 5 of 1,234 patients</span>
                    <div className="flex gap-2">
                        <button className="btn bg-white border border-[var(--glass-border)] py-1 px-3">Previous</button>
                        <button className="btn bg-white border border-[var(--glass-border)] py-1 px-3">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
