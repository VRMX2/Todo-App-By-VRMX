import React from 'react';
import { Mail, Phone, MoreHorizontal, Edit, Trash2, Plus } from 'lucide-react';

export default function Staff() {
    const staff = [
        { id: 1, name: 'Dr. Anderson', role: 'Lead Physician', specialty: 'Internal Medicine', email: 'anderson@enac.com', phone: '+1 (555) 111-1111', status: 'Active', color: 'bg-orange-500' },
        { id: 2, name: 'Dr. Martinez', role: 'Physician', specialty: 'Cardiology', email: 'martinez@enac.com', phone: '+1 (555) 222-2222', status: 'Active', color: 'bg-orange-600' },
        { id: 3, name: 'Sarah Johnson', role: 'Nurse', specialty: 'Pediatric Nursing', email: 'sjohnson@enac.com', phone: '+1 (555) 333-3333', status: 'Active', color: 'bg-orange-400' },
        { id: 4, name: 'Dr. Wilson', role: 'Physician', specialty: 'Dermatology', email: 'wilson@enac.com', phone: '+1 (555) 444-4444', status: 'Active', color: 'bg-orange-700' },
        { id: 5, name: 'Michael Chen', role: 'Medical Assistant', specialty: 'General Support', email: 'mchen@enac.com', phone: '+1 (555) 555-5555', status: 'Inactive', color: 'bg-orange-300' },
        { id: 6, name: 'Emma Davis', role: 'Receptionist', specialty: 'Patient Services', email: 'edavis@enac.com', phone: '+1 (555) 666-6666', status: 'Active', color: 'bg-orange-500' },
    ];

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1>Staff Management</h1>
                    <p className="subtitle">Manage doctors, nurses, and staff information</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Plus size={20} />
                    Add Staff Member
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((member) => (
                    <div key={member.id} className="glass-card p-6 relative group hover:border-[var(--primary)] transition-colors duration-300">
                        <div className="flex justify-between items-start">
                            <div className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${member.status === 'Active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
                                {member.status}
                            </span>
                        </div>

                        <div className="mt-4">
                            <h3 className="font-bold text-lg text-[var(--text-main)] m-0">{member.name}</h3>
                            <div className="text-[var(--primary)] font-medium text-sm">{member.role}</div>
                            <div className="text-[var(--text-muted)] text-sm mt-1 mb-4">Specialty: {member.specialty}</div>
                        </div>

                        <div className="border-t border-[var(--glass-border)] pt-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                <Mail size={14} /> {member.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                                <Phone size={14} /> {member.phone}
                            </div>
                        </div>

                        <div className="flex gap-2 mt-6">
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
