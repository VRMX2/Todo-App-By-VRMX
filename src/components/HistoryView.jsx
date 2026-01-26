import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, RotateCcw, ArrowLeft, Check, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

export default function HistoryView({ tasks, onRestore, onDeleteForever, onBack }) {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('completed'); // 'completed' | 'trash'

    const completedTasks = tasks.filter(t => t.status === 'completed' || (t.completed && t.status !== 'deleted'));
    const deletedTasks = tasks.filter(t => t.status === 'deleted');

    const displayTasks = activeTab === 'completed' ? completedTasks : deletedTasks;

    return (
        <div className="history-view">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="btn btn-primary flex items-center gap-2"
                    title={t('back_to_dashboard')}
                >
                    <ArrowLeft size={20} />
                    <span>{t('back_to_dashboard')}</span>
                </button>
                <div style={{ flex: 1 }}></div> {/* Spacer to push title if needed, or just let it sit next to button */}
                <h2 className="text-xl font-bold">{t('history_title')}</h2>
            </div>

            <div className="tabs mb-6 flex gap-4 border-b border-gray-200 dark:border-gray-700">
                <button
                    className={`pb-2 px-4 ${activeTab === 'completed' ? 'border-b-2 border-primary font-bold text-primary' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('completed')}
                >
                    {t('btn_completed')} ({completedTasks.length})
                </button>
                <button
                    className={`pb-2 px-4 ${activeTab === 'trash' ? 'border-b-2 border-red-500 font-bold text-red-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('trash')}
                >
                    {t('btn_trash')} ({deletedTasks.length})
                </button>
            </div>

            <div className="history-list space-y-4">
                <AnimatePresence>
                    {displayTasks.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-gray-500 py-10"
                        >
                            {activeTab === 'completed' ? t('empty_history') : t('empty_trash')}
                        </motion.div>
                    ) : (
                        displayTasks.map(task => (
                            <motion.div
                                key={task.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={`glass-card p-4 flex justify-between items-center ${activeTab === 'trash' ? 'opacity-75' : ''}`}
                            >
                                <div>
                                    <div className="flex items-center gap-2">
                                        {activeTab === 'completed' && <Check size={16} className="text-green-500" />}
                                        <h3 className={`font-medium ${activeTab === 'completed' ? 'line-through text-gray-500' : ''}`}>
                                            {task.text}
                                        </h3>
                                    </div>
                                    <div className="text-sm text-gray-500 mt-1 flex gap-4">
                                        {task.dueDate && (
                                            <span className="flex items-center gap-1">
                                                <Calendar size={12} />
                                                {format(task.dueDate.toDate ? task.dueDate.toDate() : new Date(task.dueDate), 'MMM d, yyyy')}
                                            </span>
                                        )}
                                        <span className="capitalize">{task.category}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {activeTab === 'trash' && (
                                        <button
                                            onClick={() => onRestore(task.id)}
                                            className="btn btn-icon text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
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
                                        className="btn btn-icon text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
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
