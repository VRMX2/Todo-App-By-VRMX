import React from 'react';
import { Target, CheckCircle, Clock, PieChart } from 'lucide-react';

export default function Dashboard({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <div>
                    <div className="stat-label">Total Tasks</div>
                    <div className="stat-value">{total}</div>
                </div>
                <div className="icon-wrapper">
                    <Target size={20} />
                </div>
            </div>

            <div className="stat-card">
                <div>
                    <div className="stat-label">Completed</div>
                    <div className="stat-value">{completed}</div>
                </div>
                <div className="icon-wrapper">
                    <CheckCircle size={20} />
                </div>
            </div>

            <div className="stat-card">
                <div>
                    <div className="stat-label">In Progress</div>
                    <div className="stat-value">{active}</div>
                </div>
                <div className="icon-wrapper">
                    <Clock size={20} />
                </div>
            </div>

            <div className="stat-card">
                <div>
                    <div className="stat-label">Completion</div>
                    <div className="stat-value">{progress}%</div>
                    <div className="stat-label" style={{ fontSize: '0.75rem' }}>Overall progress</div>
                </div>
                <div className="icon-wrapper">
                    <PieChart size={20} />
                </div>
            </div>
        </div>
    );
}
