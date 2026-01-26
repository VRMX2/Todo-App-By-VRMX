import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, RotateCcw, ArrowLeft, Check, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

export default function HistoryView({ tasks, onRestore, onDeleteForever, onBack }) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('completed');

    const completedTasks = tasks.filter(t => t.status === 'completed' || (t.completed && t.status !== 'deleted'));
    const deletedTasks = tasks.filter(t => t.status === 'deleted');
    const displayTasks = activeTab === 'completed' ? completedTasks : deletedTasks;

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1rem' }}>
            {/* Simple Header with Back Button */}
            <div style={{ marginBottom: '2rem' }}>
                <button
                    onClick={onBack}
                    className="btn btn-primary"
                    style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                >
                    <ArrowLeft size={18} />
                    {t('back_to_dashboard')}
                </button>

                <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    {t('history_title')}
                </h1>
            </div>

            {/* Clean Tab Switcher */}
            <div className="filter-tabs" style={{ marginBottom: '2rem' }}>
                <button
                    className={`filter-tab ${activeTab === 'completed' ? 'active' : ''}`}
                    onClick={() => setActiveTab('completed')}
                >
                    <Check size={16} style={{ marginRight: '0.5rem' }} />
                    {t('btn_completed')} ({completedTasks.length})
                </button>
                <button
                    className={`filter-tab ${activeTab === 'trash' ? 'active' : ''}`}
                    onClick={() => setActiveTab('trash')}
                >
                    <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
                    {t('btn_trash')} ({deletedTasks.length})
                </button>
            </div>

            {/* Task List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <AnimatePresence mode="wait">
                    {displayTasks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="glass-card"
                            style={{ padding: '3rem', textAlign: 'center' }}
                        >
                            <div style={{ opacity: 0.5, marginBottom: '1rem' }}>
                                {activeTab === 'completed' ? <Check size={48} /> : <Trash2 size={48} />}
                            </div>
                            <p style={{ color: 'var(--text-muted)' }}>
                                {activeTab === 'completed' ? t('empty_history') : t('empty_trash')}
                            </p>
                        </motion.div>
                    ) : (
                        displayTasks.map((task, index) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: index * 0.03 }}
                                className="glass-card task-item"
                                style={{
                                    padding: '1.25rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    borderLeft: activeTab === 'completed' ? '4px solid #10b981' : '4px solid #ef4444'
                                }}
                            >
                                {/* Icon */}
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: activeTab === 'completed' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                    color: activeTab === 'completed' ? '#10b981' : '#ef4444',
                                    flexShrink: 0
                                }}>
                                    {activeTab === 'completed' ? <Check size={20} /> : <Trash2 size={20} />}
                                </div>

                                {/* Task Content */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <h3 style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        marginBottom: '0.5rem',
                                        textDecoration: activeTab === 'completed' ? 'line-through' : 'none',
                                        color: activeTab === 'completed' ? 'var(--text-muted)' : 'var(--text-main)'
                                    }}>
                                        {task.text}
                                    </h3>
                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                                        <span className="task-category">{task.category}</span>
                                        {task.dueDate && (
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                <Calendar size={14} />
                                                {format(task.dueDate.toDate ? task.dueDate.toDate() : new Date(task.dueDate), 'MMM d, yyyy')}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="task-actions" style={{ display: 'flex', gap: '0.5rem' }}>
                                    {activeTab === 'trash' && (
                                        <button
                                            onClick={() => onRestore(task.id)}
                                            className="btn-icon"
                                            style={{ color: '#3b82f6' }}
                                            title={t('restore_tooltip')}
                                        >
                                            <RotateCcw size={18} />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            if (window.confirm(t('confirm_delete_forever'))) {
                                                onDeleteForever(task.id);
                                            }
                                        }}
                                        className="btn-icon delete"
                                        title={t('delete_forever_tooltip')}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
