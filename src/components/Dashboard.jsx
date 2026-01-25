import React from 'react';
import { Target, CheckCircle, Clock, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Dashboard({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
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
            <StatCard
                label="In Progress"
                value={active}
                icon={Clock}
                delay={0.2}
            />
            <StatCard
                label="Completion"
                value={`${progress}%`}
                icon={PieChart}
                subtext="Overall progress"
                delay={0.3}
            />
        </motion.div>
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
