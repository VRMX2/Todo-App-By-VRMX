import React, { useState } from 'react';
import TaskItem from './TaskItem';

export default function TaskList({ tasks, onToggle, onDelete }) {
    const [filter, setFilter] = useState('all');

    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'done') return task.completed;
        return true;
    });

    const getCount = (type) => {
        if (type === 'active') return tasks.filter(t => !t.completed).length;
        if (type === 'done') return tasks.filter(t => t.completed).length;
        return tasks.length;
    };

    return (
        <div>
            <div className="filter-tabs">
                {['all', 'active', 'done'].map((f) => (
                    <button
                        key={f}
                        className={`filter-tab ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                        <span style={{ marginLeft: '0.25rem', opacity: 0.7 }}>
                            ({getCount(f)})
                        </span>
                    </button>
                ))}
            </div>

            <div className="task-list">
                {filteredTasks.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#6b7280', padding: '2rem' }}>
                        No tasks found
                    </div>
                ) : (
                    filteredTasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={onToggle}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
