import React, { useState } from 'react';
import TaskItem from './TaskItem';
import { motion, AnimatePresence } from 'framer-motion';

export default function TaskList({ tasks, onToggle, onDelete, onUpdate }) {
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
                        <span style={{ marginLeft: '0.5rem', opacity: 0.7, fontSize: '0.8rem' }}>
                            {getCount(f)}
                        </span>
                    </button>
                ))}
            </div>

            <motion.div
                className="task-list"
                layout
            >
                <AnimatePresence mode='popLayout'>
                    {filteredTasks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem' }}
                        >
                            No tasks found in this view
                        </motion.div>
                    ) : (
                        filteredTasks.map(task => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={onToggle}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                            />
                        ))
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}
