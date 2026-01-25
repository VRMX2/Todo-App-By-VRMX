import React from 'react';
import { Target, CheckCircle, Clock, PieChart, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

import { calculateStreak, getAISuggestion } from '../utils/gamification';

export default function Dashboard({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    const points = completed * 10;
    const streak = calculateStreak(tasks);
    const suggestion = getAISuggestion(tasks);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card mb-4"
                style={{ padding: '1rem', borderLeft: '4px solid var(--primary)', background: 'rgba(249, 115, 22, 0.05)' }}
            >
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.25rem' }}>🤖</span>
                    <span style={{ fontWeight: 500, color: 'var(--text-main)' }}>{suggestion}</span>
                </div>
            </motion.div>

            <motion.div
                className="stats-grid"
                variants={container}
                initial="hidden"
                animate="show"
            >
                <StatCard
                    label="Total Tasks"
                    value={total}
                    icon={Target}
                    delay={0}
                />
                <StatCard
                    label="Completed"
                    value={completed}
                    icon={CheckCircle}
                    delay={0.1}
                />
                <div className="stat-card glass-card">
                    <div>
                        <div className="stat-label">Progress</div>
                        <div className="stat-value">{progress}%</div>
                        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginTop: '0.5rem', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                style={{ height: '100%', background: 'var(--primary)', borderRadius: '4px' }}
                            />
                        </div>
                    </div>
                    <motion.div
                        className="icon-wrapper"
                        whileHover={{ rotate: 180, scale: 1.2 }}
                    >
                        <PieChart size={24} />
                    </motion.div>
                </div>
                <StatCard
                    label="Points"
                    value={points}
                    icon={Flame}
                    subtext="Keep grinding!"
                    delay={0.4}
                />
                <StatCard
                    label="Day Streak"
                    value={streak}
                    icon={Flame}
                    subtext={streak > 0 ? "🔥 You're on fire!" : "Start a streak today!"}
                    delay={0.5}
                />
            </motion.div>
        </>
    );
}

function StatCard({ label, value, icon: Icon, subtext, delay }) {
    return (
        <motion.div
            className="stat-card glass-card"
            variants={{
                hidden: { opacity: 0, y: 20, rotateX: -10 },
                show: { opacity: 1, y: 0, rotateX: 0 }
            }}
            whileHover={{
                y: -5,
                rotateX: 5,
                rotateY: 5,
                scale: 1.02,
                boxShadow: "0 15px 35px rgba(249, 115, 22, 0.2)"
            }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div>
                <div className="stat-label">{label}</div>
                <div className="stat-value">{value}</div>
                {subtext && <div className="stat-label" style={{ fontSize: '0.75rem', opacity: 0.8 }}>{subtext}</div>}
            </div>
            <motion.div
                className="icon-wrapper"
                whileHover={{ rotate: 180, scale: 1.2 }}
            >
                <Icon size={24} />
            </motion.div>
        </motion.div>
    );
}
