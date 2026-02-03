import React from 'react';
import { FileText, Download, Eye, Trash2, Plus, Calendar } from 'lucide-react';

export default function MedicalRecords() {
    const records = [
        { id: 1, title: 'Lab Results', patient: 'John Smith', date: 'Feb 3, 2025', doctor: 'Dr. Anderson', type: 'Lab', status: 'Complete' },
        { id: 2, title: 'X-Ray', patient: 'Emma Johnson', date: 'Feb 2, 2025', doctor: 'Dr. Martinez', type: 'Imaging', status: 'Complete' },
        { id: 3, title: 'Prescription', patient: 'Michael Brown', date: 'Feb 1, 2025', doctor: 'Dr. Anderson', type: 'Rx', status: 'Pending' },
        { id: 4, title: 'Blood Work', patient: 'Sarah Williams', date: 'Jan 31, 2025', doctor: 'Dr. Wilson', type: 'Lab', status: 'Complete' },
        { id: 5, title: 'Ultrasound', patient: 'David Lee', date: 'Jan 30, 2025', doctor: 'Dr. Martinez', type: 'Imaging', status: 'Complete' },
        { id: 6, title: 'Clinical Notes', patient: 'John Smith', date: 'Jan 28, 2025', doctor: 'Dr. Anderson', type: 'Note', status: 'Complete' },
    ];

    return (
        <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1>Medical Records</h1>
                    <p className="subtitle">Access and manage patient medical records</p>
                </div>
                <button className="btn-primary flex items-center gap-2">
                    <Plus size={20} />
                    Upload Record
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {records.map(record => (
                    <div key={record.id} className="glass-card p-4 flex items-center justify-between gap-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md ${record.type === 'Lab' ? 'bg-blue-500' :
                                    record.type === 'Imaging' ? 'bg-purple-500' :
                                        record.type === 'Rx' ? 'bg-orange-500' :
                                            'bg-green-500'
                                }`}>
                                <FileText size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-[var(--text-main)] m-0">{record.title}</h3>
                                <div className="text-sm text-[var(--text-muted)] mt-1">
                                    <span className="font-medium text-[var(--text-main)]">{record.patient}</span> • {record.date} • {record.doctor}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold uppercase ${record.status === 'Complete' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                                }`}>
                                {record.status}
                            </span>

                            <div className="flex gap-2">
                                <button className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors" title="View">
                                    <Eye size={18} />
                                </button>
                                <button className="p-2 text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors" title="Download">
                                    <Download size={18} />
                                </button>
                                <button className="p-2 text-[var(--text-muted)] hover:text-red-500 transition-colors" title="Delete">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 flex justify-between items-center text-sm text-[var(--text-muted)] mt-4">
                <span>Showing 1 to 6 of 324 records</span>
                <div className="flex gap-2">
                    <button className="btn bg-white border border-[var(--glass-border)] py-1 px-3">Previous</button>
                    <button className="btn bg-white border border-[var(--glass-border)] py-1 px-3">Next</button>
                </div>
            </div>
        </div>
    );
}
