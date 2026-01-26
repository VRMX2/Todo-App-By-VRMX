import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MobileHeader({ user, onMenuClick, onNotificationClick }) {
    return (
        <div style={{
            position: 'sticky',
            top: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'var(--glass-bg)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            zIndex: 999,
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)'
        }}>
            {/* Left: Profile Avatar */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onMenuClick}
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid var(--primary)',
                    background: 'var(--glass-bg)',
                    cursor: 'pointer',
                    padding: 0
                }}
            >
                {user?.photoURL ? (
                    <img
                        src={user.photoURL}
                        alt="Profile"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                ) : (
                    <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'linear-gradient(135deg, #f97316, #ea580c)',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '700'
                    }}>
                        {user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                )}
            </motion.button>

            {/* Center: App Title */}
            <div style={{
                flex: 1,
                textAlign: 'center',
                padding: '0 16px'
            }}>
                <h1 style={{
                    fontSize: '20px',
                    fontWeight: '800',
                    margin: 0,
                    background: 'linear-gradient(135deg, var(--text-main), var(--primary))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.02em'
                }}>
                    TaskVrmx
                </h1>
            </div>

            {/* Right: Notifications */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={onNotificationClick}
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'rgba(249, 115, 22, 0.1)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    position: 'relative'
                }}
            >
                <Bell size={20} color="var(--primary)" />
                {/* Notification badge */}
                <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '8px',
                    height: '8px',
                    background: '#ef4444',
                    borderRadius: '50%',
                    border: '2px solid var(--bg-main)'
                }} />
            </motion.button>
        </div>
    );
}
