import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, Check, Edit2, Save, X, Calendar, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

export default function TaskItem({ task, onToggle, onDelete, onUpdate }) {
    const { t } = useTranslation();
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
            low: { emoji: '🟢', label: t('priority_low'), color: '#10b981' },
            medium: { emoji: '🟡', label: t('priority_medium'), color: '#f59e0b' },
            high: { emoji: '🔴', label: t('priority_high'), color: '#ef4444' }
        };
        return badges[priority] || badges.medium;
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: { emoji: '🕒', label: t('filter_pending'), color: '#6b7280' },
            'in-progress': { emoji: '🔄', label: t('filter_in_progress'), color: '#3b82f6' },
            completed: { emoji: '✅', label: t('filter_completed'), color: '#10b981' }
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
                <div className="edit-mode-container">
                    <input
                        type="text"
                        value={editedTask.text}
                        onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
                        className="edit-input-title"
                        placeholder={t('task_title')}
                    />
                    <textarea
                        value={editedTask.description}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                        className="edit-input-desc"
                        placeholder={t('description')}
                        rows="2"
                    />
                    <div className="edit-grid">
                        <div className="input-field">
                            <label>{t('priority_label')}</label>
                            <select
                                value={editedTask.priority}
                                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                            >
                                <option value="low">🟢 {t('priority_low')}</option>
                                <option value="medium">🟡 {t('priority_medium')}</option>
                                <option value="high">🔴 {t('priority_high')}</option>
                            </select>
                        </div>
                        <div className="input-field">
                            <label>{t('filter_status') || 'Status'}</label>
                            <select
                                value={editedTask.status}
                                onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                            >
                                <option value="pending">🕒 {t('filter_pending')}</option>
                                <option value="in-progress">🔄 {t('filter_in_progress')}</option>
                                <option value="completed">✅ {t('filter_completed')}</option>
                            </select>
                        </div>
                        <div className="input-field">
                            <label>{t('due_date_label')}</label>
                            <DatePicker
                                selected={editedTask.dueDate}
                                onChange={(date) => setEditedTask({ ...editedTask, dueDate: date })}
                                placeholderText={t('due_date')}
                                dateFormat="MMM d, yyyy"
                                isClearable
                            />
                        </div>
                    </div>
                    <div className="input-actions">
                        <button
                            onClick={handleCancel}
                            className="btn-text"
                        >
                            {t('cancel')}
                        </button>
                        <button
                            onClick={handleSave}
                            className="btn btn-primary"
                        >
                            <Save size={16} style={{ marginRight: '0.5rem' }} /> {t('save')}
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
                                        {t('due_prefix')} {format(task.dueDate.toDate ? task.dueDate.toDate() : new Date(task.dueDate), 'MMM d, yyyy')}
                                        {overdue && ` (${t('overdue')})`}
                                    </span>
                                </div>
                            )}
                            {task.recurrence && task.recurrence !== 'none' && (
                                <div className="flex items-center gap-1 text-xs text-blue-500 font-medium mt-1">
                                    <Repeat size={12} />
                                    <span className="capitalize">{task.recurrence}</span>
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
