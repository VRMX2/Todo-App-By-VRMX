import React from 'react';
import { Home, BarChart3, Plus, History, User } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileBottomNav({ activeTab, onTabChange, onAddClick }) {
    const tabs = [
        { id: 'home', icon: Home, label: 'Tasks' },
        { id: 'dashboard', icon: BarChart3, label: 'Stats' },
        { id: 'add', icon: Plus, label: 'Add', isFAB: true },
        { id: 'history', icon: History, label: 'History' },
        { id: 'profile', icon: User, label: 'Profile' }
    ];

    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            padding: '0 8px',
            zIndex: 1000,
            boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.1)'
        }}>
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                if (tab.isFAB) {
                    return (
                        <motion.button
                            key={tab.id}
                            whileTap={{ scale: 0.9 }}
                            onClick={onAddClick}
                            style={{
                                width: '56px',
                                height: '56px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                border: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(249, 115, 22, 0.4)',
                                marginTop: '-28px',
                                position: 'relative'
                            }}
                        >
                            <Icon size={28} color="white" strokeWidth={2.5} />
                        </motion.button>
                    );
                }

                return (
                    <motion.button
                        key={tab.id}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onTabChange(tab.id)}
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '4px',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '8px',
                            transition: 'all 0.3s',
                            color: isActive ? 'var(--primary)' : 'var(--text-muted)'
                        }}
                    >
                        <motion.div
                            animate={{
                                scale: isActive ? 1.1 : 1,
                                y: isActive ? -2 : 0
                            }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                        </motion.div>
                        <span style={{
                            fontSize: '11px',
                            fontWeight: isActive ? '700' : '500',
                            letterSpacing: '0.02em'
                        }}>
                            {tab.label}
                        </span>
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '40px',
                                    height: '3px',
                                    background: 'var(--primary)',
                                    borderRadius: '3px 3px 0 0'
                                }}
                            />
                        )}
                    </motion.button>
                );
            })}
        </div>
    );
}
