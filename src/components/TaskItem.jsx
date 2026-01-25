import React from 'react';
import { Check, Trash2 } from 'lucide-react';

export default function TaskItem({ task, onToggle, onDelete }) {
    return (
        <div className="task-item">
            <div
                className={`task-checkbox ${task.completed ? 'checked' : ''}`}
                onClick={() => onToggle(task.id)}
            >
                {task.completed && <Check size={14} />}
            </div>

            <span className={`task-content ${task.completed ? 'completed' : ''}`}>
                {task.text}
            </span>

            <span className="tag">
                {task.category || 'Personal'}
            </span>

            <button
                className="delete-btn"
                onClick={() => onDelete(task.id)}
                aria-label="Delete task"
            >
                <Trash2 size={18} />
            </button>
        </div>
    );
}
