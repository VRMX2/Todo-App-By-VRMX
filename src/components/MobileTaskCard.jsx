import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { Trash2, Check, Calendar, Tag, AlertCircle, Edit2 } from 'lucide-react';
import { format } from 'date-fns';

export default function MobileTaskCard({ task, onToggle, onDelete, onUpdate }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const x = useMotionValue(0);

    // Transform x position to background color
    const background = useTransform(
        x,
        [-100, 0, 100],
        ['rgba(239, 68, 68, 0.2)', 'transparent', 'rgba(16, 185, 129, 0.2)']
    );

    const handleDragEnd = (event, info) => {
        if (info.offset.x > 100) {
            // Swiped right - complete
            onToggle(task.id);
        } else if (info.offset.x < -100) {
            // Swiped left - delete
            if (confirm('Delete this task?')) {
                onDelete(task.id);
            }
        }
        x.set(0);
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return '#ef4444';
            case 'medium': return '#f97316';
            case 'low': return '#10b981';
            default: return '#6b7280';
        }
    };

    const isOverdue = task.dueDate && new Date(task.dueDate.seconds * 1000) < new Date();

    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            style={{
                x,
                background,
                margin: '12px 16px',
                borderRadius: '20px',
                position: 'relative'
            }}
        >
            {/* Swipe indicators */}
            <div style={{
                position: 'absolute',
                left: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.6
            }}>
                <Trash2 size={24} color="#ef4444" />
            </div>
            <div style={{
                position: 'absolute',
                right: '20px',
                top: '50%',
                transform: 'translateY(-50%)',
                opacity: 0.6
            }}>
                <Check size={24} color="#10b981" />
            </div>

            {/* Card content */}
            <motion.div
                onClick={() => setIsExpanded(!isExpanded)}
                style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '20px',
                    padding: '16px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                    cursor: 'pointer',
                    borderLeft: `4px solid ${getPriorityColor(task.priority)}`
                }}
                whileTap={{ scale: 0.98 }}
            >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    {/* Checkbox */}
                    <motion.div
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle(task.id);
                        }}
                        style={{
                            width: '24px',
                            height: '24px',
                            minWidth: '24px',
                            borderRadius: '50%',
                            border: `2px solid ${task.completed ? 'var(--primary)' : 'var(--text-muted)'}`,
                            background: task.completed ? 'var(--primary)' : 'transparent',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '2px'
                        }}
                    >
                        {task.completed && <Check size={14} color="white" strokeWidth={3} />}
                    </motion.div>

                    {/* Task info */}
                    <div style={{ flex: 1 }}>
                        <div style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: 'var(--text-main)',
                            textDecoration: task.completed ? 'line-through' : 'none',
                            opacity: task.completed ? 0.6 : 1,
                            marginBottom: '8px',
                            lineHeight: '1.4'
                        }}>
                            {task.text}
                        </div>

                        {/* Meta info */}
                        <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '8px',
                            alignItems: 'center'
                        }}>
                            {task.category && (
                                <span style={{
                                    fontSize: '12px',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    background: 'rgba(249, 115, 22, 0.1)',
                                    color: 'var(--primary)',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    <Tag size={12} />
                                    {task.category}
                                </span>
                            )}

                            {task.dueDate && (
                                <span style={{
                                    fontSize: '12px',
                                    padding: '4px 10px',
                                    borderRadius: '12px',
                                    background: isOverdue ? 'rgba(239, 68, 68, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                                    color: isOverdue ? '#ef4444' : 'var(--text-muted)',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px'
                                }}>
                                    {isOverdue && <AlertCircle size={12} />}
                                    <Calendar size={12} />
                                    {format(new Date(task.dueDate.seconds * 1000), 'MMM d')}
                                </span>
                            )}
                        </div>

                        {/* Expanded details */}
                        {isExpanded && task.description && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{
                                    marginTop: '12px',
                                    paddingTop: '12px',
                                    borderTop: '1px solid var(--glass-border)',
                                    fontSize: '14px',
                                    color: 'var(--text-muted)',
                                    lineHeight: '1.6'
                                }}
                            >
                                {task.description}
                            </motion.div>
                        )}
                    </div>

                    {/* Delete button - always visible */}
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Delete this task?')) {
                                onDelete(task.id);
                            }
                        }}
                        style={{
                            width: '36px',
                            height: '36px',
                            minWidth: '36px',
                            borderRadius: '12px',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        <Trash2 size={18} color="#ef4444" strokeWidth={2} />
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
}
