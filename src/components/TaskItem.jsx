import React, { useState } from 'react';
import { Trash2, Check, Edit2, Save, X, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskItem({ task, onToggle, onDelete, onUpdate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState({
        text: task.text,
        description: task.description || '',
        priority: task.priority || 'medium',
        status: task.status || 'pending',
        dueDate: task.dueDate?.toDate ? task.dueDate.toDate() : null
    });

    const handleSave = () => {
        onUpdate(task.id, {
            text: editedTask.text,
            description: editedTask.description,
            priority: editedTask.priority,
            status: editedTask.status,
            dueDate: editedTask.dueDate
        });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditedTask({
            text: task.text,
            description: task.description || '',
            priority: task.priority || 'medium',
            status: task.status || 'pending',
            dueDate: task.dueDate?.toDate ? task.dueDate.toDate() : null
        });
        setIsEditing(false);
    };

    const getPriorityBadge = (priority) => {
        const badges = {
            low: { emoji: '🟢', label: 'Low', color: '#10b981' },
            medium: { emoji: '🟡', label: 'Medium', color: '#f59e0b' },
            high: { emoji: '🔴', label: 'High', color: '#ef4444' }
        };
        return badges[priority] || badges.medium;
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { emoji: '🕒', label: 'Pending', color: '#6b7280' },
            'in-progress': { emoji: '🔄', label: 'In Progress', color: '#3b82f6' },
            completed: { emoji: '✅', label: 'Completed', color: '#10b981' }
        };
        return badges[status] || badges.pending;
    };

    const isOverdue = () => {
        if (!task.dueDate) return false;
        const dueDate = task.dueDate.toDate ? task.dueDate.toDate() : new Date(task.dueDate);
        return dueDate < new Date() && task.status !== 'completed';
    };

    const priorityBadge = getPriorityBadge(task.priority || 'medium');
    const statusBadge = getStatusBadge(task.status || 'pending');
    const overdue = isOverdue();

    return (
        <motion.div
            className={`task-item ${task.completed ? 'completed' : ''} ${overdue ? 'overdue' : ''}`}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            whileHover={{ scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            {isEditing ? (
                <div className="edit-mode">
                    <input
                        type="text"
                        value={editedTask.text}
                        onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
                        className="edit-input"
                        placeholder="Task title"
                    />
                    <textarea
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                        className="edit-textarea"
                        placeholder="Description (optional)"
                        rows="2"
                    />
                    <div className="edit-controls">
                        <select
                            value={editedTask.priority}
                            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                            className="edit-select"
                        >
                            <option value="low">🟢 Low Priority</option>
                            <option value="medium">🟡 Medium Priority</option>
                            <option value="high">🔴 High Priority</option>
                        </select>
                        <select
                            value={editedTask.status}
                            onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                            className="edit-select"
                        >
                            <option value="pending">🕒 Pending</option>
                            <option value="in-progress">🔄 In Progress</option>
                            <option value="completed">✅ Completed</option>
                        </select>
                        <DatePicker
                            selected={editedTask.dueDate}
                            onChange={(date) => setEditedTask({ ...editedTask, dueDate: date })}
                            className="edit-datepicker"
                            placeholderText="Due date"
                            dateFormat="MMM d, yyyy"
                            isClearable
                        />
                    </div>
                    <div className="edit-actions">
                        <button onClick={handleSave} className="btn btn-primary btn-sm">
                            <Save size={16} /> Save
                        </button>
                        <button onClick={handleCancel} className="btn btn-sm">
                            <X size={16} /> Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <div className="task-content">
                        <button
                            className={`checkbox ${task.completed ? 'checked' : ''}`}
                            onClick={() => onToggle(task.id)}
                        >
                            {task.completed && <Check size={16} />}
                        </button>
                        <div className="task-details">
                            <div className="task-header">
                                <span className="task-text">{task.text}</span>
                                <div className="task-badges">
                                    <span
                                        className="badge priority-badge"
                                        style={{ backgroundColor: priorityBadge.color + '20', color: priorityBadge.color }}
                                    >
                                        {priorityBadge.emoji} {priorityBadge.label}
                                    </span>
                                    <span
                                        className="badge status-badge"
                                        style={{ backgroundColor: statusBadge.color + '20', color: statusBadge.color }}
                                    >
                                        {statusBadge.emoji} {statusBadge.label}
                                    </span>
                                </div>
                            </div>
                            {task.description && (
                                <p className="task-description">{task.description}</p>
                            )}
                            {task.dueDate && (
                                <div className={`task-due-date ${overdue ? 'overdue-text' : ''}`}>
                                    <Calendar size={14} />
                                    <span>
                                        Due: {format(task.dueDate.toDate ? task.dueDate.toDate() : new Date(task.dueDate), 'MMM d, yyyy')}
                                        {overdue && ' (Overdue!)'}
                                    </span>
                                </div>
                            )}
                            <span className="task-category">{task.category}</span>
                        </div>
                    </div>
                    <div className="task-actions">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="btn-icon"
                            title="Edit task"
                        >
                            <Edit2 size={18} />
                        </button>
                        <button
                            onClick={() => onDelete(task.id)}
                            className="btn-icon delete"
                            title="Delete task"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </>
            )}
        </motion.div>
    );
}
