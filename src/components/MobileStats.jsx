import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, Zap, Award, Calendar, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function MobileStats({ tasks }) {
    const activeTasks = tasks.filter(t => !t.completed && t.status !== 'deleted');
    const completedTasks = tasks.filter(t => t.completed);
    const totalTasks = tasks.filter(t => t.status !== 'deleted');
    const completionRate = totalTasks.length > 0 ? Math.round((completedTasks.length / totalTasks.length) * 100) : 0;

    const highPriority = activeTasks.filter(t => t.priority === 'high').length;
    const overdueTasks = activeTasks.filter(t => {
        if (!t.dueDate) return false;
        const dueDate = t.dueDate.toDate ? t.dueDate.toDate() : new Date(t.dueDate.seconds * 1000);
        return dueDate < new Date();
    }).length;

    const stats = [
        {
            icon: Target,
            label: 'Active Tasks',
            value: activeTasks.length,
            color: '#f97316',
            bgColor: 'rgba(249, 115, 22, 0.1)'
        },
        {
            icon: CheckCircle2,
            label: 'Completed',
            value: completedTasks.length,
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.1)'
        },
        {
            icon: AlertTriangle,
            label: 'High Priority',
            value: highPriority,
            color: '#ef4444',
            bgColor: 'rgba(239, 68, 68, 0.1)'
        },
        {
            icon: Clock,
            label: 'Overdue',
            value: overdueTasks,
            color: '#f59e0b',
            bgColor: 'rgba(245, 158, 11, 0.1)'
        }
    ];

    return (
        <div style={{ padding: '16px' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h2 style={{
                    fontSize: '24px',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, var(--text-main), var(--primary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '8px'
                }}>
                    Your Progress
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                    Track your productivity and achievements
                </p>
            </div>

            {/* Completion Rate Circle */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: 'var(--glass-bg)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '24px',
                    padding: '32px',
                    marginBottom: '20px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                {/* Background gradient */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.1), transparent)',
                    pointerEvents: 'none'
                }} />

                {/* Progress Circle */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <svg width="160" height="160" style={{ transform: 'rotate(-90deg)' }}>
                        {/* Background circle */}
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="rgba(249, 115, 22, 0.1)"
                            strokeWidth="12"
                        />
                        {/* Progress circle */}
                        <motion.circle
                            cx="80"
                            cy="80"
                            r="70"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={`${2 * Math.PI * 70}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - completionRate / 100) }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#f97316" />
                                <stop offset="100%" stopColor="#ea580c" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Center text */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            fontSize: '40px',
                            fontWeight: '900',
                            background: 'linear-gradient(135deg, #f97316, #ea580c)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {completionRate}%
                        </div>
                        <div style={{
                            fontSize: '12px',
                            color: 'var(--text-muted)',
                            fontWeight: '600',
                            marginTop: '4px'
                        }}>
                            Complete
                        </div>
                    </div>
                </div>

                <div style={{
                    marginTop: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: 'var(--text-muted)',
                    fontSize: '14px'
                }}>
                    <Award size={16} color="var(--primary)" />
                    <span>{completedTasks.length} of {totalTasks.length} tasks completed</span>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '12px',
                marginBottom: '20px'
            }}>
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            style={{
                                background: 'var(--glass-bg)',
                                backdropFilter: 'blur(16px)',
                                border: '1px solid var(--glass-border)',
                                borderRadius: '20px',
                                padding: '20px',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Icon background */}
                            <div style={{
                                position: 'absolute',
                                top: '-10px',
                                right: '-10px',
                                width: '80px',
                                height: '80px',
                                background: stat.bgColor,
                                borderRadius: '50%',
                                opacity: 0.5
                            }} />

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                marginBottom: '12px',
                                position: 'relative'
                            }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '12px',
                                    background: stat.bgColor,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Icon size={20} color={stat.color} strokeWidth={2.5} />
                                </div>
                            </div>

                            <div style={{
                                fontSize: '32px',
                                fontWeight: '900',
                                color: stat.color,
                                marginBottom: '4px',
                                position: 'relative'
                            }}>
                                {stat.value}
                            </div>
                            <div style={{
                                fontSize: '13px',
                                color: 'var(--text-muted)',
                                fontWeight: '600',
                                position: 'relative'
                            }}>
                                {stat.label}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Productivity Insights */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                style={{
                    background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), rgba(234, 88, 12, 0.05))',
                    border: '1px solid rgba(249, 115, 22, 0.2)',
                    borderRadius: '20px',
                    padding: '20px'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #f97316, #ea580c)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <TrendingUp size={20} color="white" strokeWidth={2.5} />
                    </div>
                    <div>
                        <div style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-main)' }}>
                            Productivity Insight
                        </div>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                            {completionRate >= 70 ? 'Excellent progress!' : completionRate >= 40 ? 'Keep it up!' : 'You can do it!'}
                        </div>
                    </div>
                </div>
                <div style={{
                    fontSize: '14px',
                    color: 'var(--text-muted)',
                    lineHeight: '1.6'
                }}>
                    {overdueTasks > 0 && `You have ${overdueTasks} overdue task${overdueTasks > 1 ? 's' : ''}. `}
                    {highPriority > 0 && `Focus on ${highPriority} high priority task${highPriority > 1 ? 's' : ''} first. `}
                    {completionRate >= 70 && "You're crushing it! 🎉"}
                </div>
            </motion.div>
        </div>
    );
}
