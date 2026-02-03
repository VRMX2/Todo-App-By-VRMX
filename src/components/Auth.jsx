import React, { useState } from 'react';
import { auth } from '../firebase';
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from 'firebase/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, CheckCircle2, Sparkles, Shield, Zap } from 'lucide-react';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [isReset, setIsReset] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleGoogleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleEmailAuth = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        try {
            if (isReset) {
                await sendPasswordResetEmail(auth, email);
                setMessage('Password reset email sent! Check your inbox.');
                setIsReset(false);
            } else if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            setError(err.message.replace('Firebase: ', ''));
        }
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: 'var(--bg-main)',
            position: 'relative',
            overflow: 'hidden',
            flexDirection: window.innerWidth <= 768 ? 'column' : 'row'
        }}>
            {/* 3D Animated Background */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(249, 115, 22, 0.15) 0%, transparent 50%)',
                opacity: 0.6
            }}>
                {/* Floating Orbs */}
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        position: 'absolute',
                        top: '20%',
                        left: '10%',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.3), transparent)',
                        borderRadius: '50%',
                        filter: 'blur(60px)',
                    }}
                />
                <motion.div
                    animate={{
                        y: [0, 40, 0],
                        x: [0, -30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    style={{
                        position: 'absolute',
                        bottom: '10%',
                        right: '15%',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(234, 88, 12, 0.25), transparent)',
                        borderRadius: '50%',
                        filter: 'blur(80px)',
                    }}
                />
            </div>

            {/* Left Side - 3D Branding */}
            <div style={{
                flex: window.innerWidth <= 768 ? 'none' : 1,
                display: window.innerWidth <= 768 ? 'none' : 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '4rem',
                position: 'relative',
                zIndex: 1
            }}>
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {/* 3D Logo */}
                    <motion.div
                        animate={{
                            rotateY: [0, 10, 0, -10, 0],
                            rotateX: [0, 5, 0, -5, 0],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        style={{
                            width: '80px',
                            height: '80px',
                            background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '2rem',
                            boxShadow: '0 20px 60px rgba(239, 68, 68, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                            transform: 'perspective(1000px)',
                            position: 'relative'
                        }}
                    >
                        <span style={{ fontSize: '40px', fontWeight: 'bold', color: 'white' }}>✚</span>
                        <div style={{
                            position: 'absolute',
                            inset: '-10px',
                            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.3), transparent)',
                            borderRadius: '25px',
                            filter: 'blur(20px)',
                            zIndex: -1
                        }} />
                    </motion.div>

                    <h1 style={{
                        fontSize: '4rem',
                        fontWeight: '900',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(135deg, var(--text-main) 0%, #ef4444 50%, var(--text-main) 100%)',
                        backgroundSize: '200% 200%',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        letterSpacing: '-0.02em',
                        lineHeight: '1'
                    }}>
                        ENAC Medical
                    </h1>

                    <p style={{
                        fontSize: '1.375rem',
                        color: 'var(--text-muted)',
                        maxWidth: '550px',
                        lineHeight: '1.7',
                        marginBottom: '3rem'
                    }}>
                        Professional medical management system for employee health tracking, consultations, and medical records.
                    </p>

                    {/* Feature Cards */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
                        {[
                            { icon: CheckCircle2, title: 'Medical Records', desc: 'Secure digital patient files' },
                            { icon: Shield, title: 'HIPAA Compliant', desc: 'Enterprise-grade security' },
                            { icon: Zap, title: 'Efficient Workflow', desc: 'Streamlined appointment scheduling' }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                whileHover={{ x: 10, scale: 1.02 }}
                                style={{
                                    display: 'flex',
                                    gap: '1rem',
                                    padding: '1.25rem',
                                    background: 'var(--glass-bg)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s'
                                }}
                            >
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05))',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                }}>
                                    <feature.icon size={24} color="#ef4444" />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', marginBottom: '0.25rem', fontSize: '1rem' }}>{feature.title}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{feature.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Right Side - 3D Auth Form */}
            <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                position: 'relative',
                zIndex: 1,
                minHeight: window.innerWidth <= 768 ? '100vh' : 'auto'
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 30, rotateX: 10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{
                        width: '100%',
                        maxWidth: window.innerWidth <= 768 ? '100%' : '480px',
                        padding: window.innerWidth <= 768 ? '2rem' : '3.5rem',
                        background: 'var(--glass-bg)',
                        backdropFilter: 'blur(30px)',
                        border: '1px solid var(--glass-border)',
                        borderRadius: window.innerWidth <= 768 ? '24px' : '32px',
                        boxShadow: '0 30px 90px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05) inset',
                        transform: 'perspective(1000px)',
                        position: 'relative'
                    }}
                >
                    {/* Glow Effect */}
                    <div style={{
                        position: 'absolute',
                        inset: '-2px',
                        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.1), transparent, rgba(249, 115, 22, 0.1))',
                        borderRadius: '32px',
                        zIndex: -1,
                        filter: 'blur(20px)'
                    }} />

                    <div style={{ marginBottom: window.innerWidth <= 768 ? '1.5rem' : '2.5rem' }}>
                        <motion.h2
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                fontSize: window.innerWidth <= 768 ? '1.75rem' : '2.25rem',
                                fontWeight: '800',
                                marginBottom: '0.75rem',
                                background: 'linear-gradient(135deg, var(--text-main), var(--primary))',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}
                        >
                            {isReset ? 'Reset Password' : (isLogin ? 'Welcome Back' : 'Get Started')}
                        </motion.h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: window.innerWidth <= 768 ? '0.875rem' : '0.9375rem', lineHeight: '1.5' }}>
                            {isReset ? 'Enter your email to receive a reset link' : (isLogin ? 'Sign in to access your workspace' : 'Create your account in seconds')}
                        </p>
                    </div>

                    {/* Google Sign In */}
                    <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGoogleLogin}
                        style={{
                            width: '100%',
                            padding: window.innerWidth <= 768 ? '0.875rem' : '1rem',
                            background: 'linear-gradient(135deg, #ffffff, #f8f9fa)',
                            color: '#1f2937',
                            border: 'none',
                            borderRadius: '16px',
                            fontSize: window.innerWidth <= 768 ? '0.9375rem' : '1rem',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.875rem',
                            cursor: 'pointer',
                            marginBottom: window.innerWidth <= 768 ? '1.5rem' : '2rem',
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.05)',
                            transition: 'all 0.3s'
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 18 18">
                            <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
                            <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
                            <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z" />
                            <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" />
                        </svg>
                        Continue with Google
                    </motion.button>

                    {/* Divider */}
                    <div style={{ display: 'flex', alignItems: 'center', margin: '2rem 0' }}>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, var(--glass-border), transparent)' }} />
                        <span style={{ padding: '0 1.25rem', color: 'var(--text-muted)', fontSize: '0.8125rem', fontWeight: '700', letterSpacing: '0.05em' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, var(--glass-border), transparent)' }} />
                    </div>

                    {/* Email Form */}
                    <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <motion.div
                            whileHover={{ scale: 1.01 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <label style={{ display: 'block', marginBottom: '0.625rem', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)', letterSpacing: '0.01em' }}>
                                Email Address
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={20} style={{ position: 'absolute', left: '1.125rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 1 }} />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.125rem 1rem 3.5rem',
                                        background: 'rgba(255, 255, 255, 0.03)',
                                        border: '2px solid var(--glass-border)',
                                        borderRadius: '14px',
                                        color: 'var(--text-main)',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'all 0.3s',
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--primary)';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.06)';
                                        e.target.style.boxShadow = '0 0 0 4px rgba(249, 115, 22, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'var(--glass-border)';
                                        e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                                        e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                                    }}
                                />
                            </div>
                        </motion.div>

                        {!isReset && (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <label style={{ display: 'block', marginBottom: '0.625rem', fontSize: '0.875rem', fontWeight: '700', color: 'var(--text-main)', letterSpacing: '0.01em' }}>
                                    Password
                                </label>
                                <div style={{ position: 'relative' }}>
                                    <Lock size={20} style={{ position: 'absolute', left: '1.125rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', zIndex: 1 }} />
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                        style={{
                                            width: '100%',
                                            padding: '1rem 1.125rem 1rem 3.5rem',
                                            background: 'rgba(255, 255, 255, 0.03)',
                                            border: '2px solid var(--glass-border)',
                                            borderRadius: '14px',
                                            color: 'var(--text-main)',
                                            fontSize: '1rem',
                                            outline: 'none',
                                            transition: 'all 0.3s',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'var(--primary)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.06)';
                                            e.target.style.boxShadow = '0 0 0 4px rgba(249, 115, 22, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'var(--glass-border)';
                                            e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                                            e.target.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.04)';
                                        }}
                                    />
                                </div>
                            </motion.div>
                        )}

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                    exit={{ opacity: 0, height: 0, scale: 0.9 }}
                                    style={{
                                        padding: '1rem 1.25rem',
                                        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.1), rgba(239, 68, 68, 0.05))',
                                        border: '1px solid rgba(239, 68, 68, 0.3)',
                                        borderRadius: '14px',
                                        color: '#ef4444',
                                        fontSize: '0.875rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    {error}
                                </motion.div>
                            )}

                            {message && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                    exit={{ opacity: 0, height: 0, scale: 0.9 }}
                                    style={{
                                        padding: '1rem 1.25rem',
                                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05))',
                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                        borderRadius: '14px',
                                        color: '#10b981',
                                        fontSize: '0.875rem',
                                        fontWeight: '500'
                                    }}
                                >
                                    {message}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                                width: '100%',
                                padding: '1.125rem',
                                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '14px',
                                fontSize: '1.0625rem',
                                fontWeight: '700',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.625rem',
                                cursor: 'pointer',
                                marginTop: '0.5rem',
                                boxShadow: '0 10px 30px rgba(249, 115, 22, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
                                transition: 'all 0.3s',
                                letterSpacing: '0.01em'
                            }}
                        >
                            {isReset ? 'Send Reset Link' : (isLogin ? 'Sign In' : 'Create Account')}
                            <ArrowRight size={20} strokeWidth={2.5} />
                        </motion.button>
                    </form>

                    {/* Footer Links */}
                    <div style={{ marginTop: '2rem', textAlign: 'center' }}>
                        {!isReset && (
                            <button
                                onClick={() => { setError(''); setMessage(''); setIsReset(true); }}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: 'var(--primary)',
                                    fontSize: '0.9375rem',
                                    cursor: 'pointer',
                                    fontWeight: '600',
                                    marginBottom: '1.25rem',
                                    display: 'block',
                                    width: '100%',
                                    transition: 'opacity 0.2s'
                                }}
                                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                                onMouseLeave={(e) => e.target.style.opacity = '1'}
                            >
                                Forgot your password?
                            </button>
                        )}

                        <div style={{ fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
                            {isReset ? (
                                <button
                                    onClick={() => { setError(''); setMessage(''); setIsReset(false); }}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'var(--primary)',
                                        cursor: 'pointer',
                                        fontWeight: '700',
                                        fontSize: '0.9375rem'
                                    }}
                                >
                                    ← Back to Sign In
                                </button>
                            ) : (
                                <>
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <button
                                        onClick={() => { setError(''); setMessage(''); setIsLogin(!isLogin); }}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: 'var(--primary)',
                                            cursor: 'pointer',
                                            fontWeight: '700',
                                            fontSize: '0.9375rem'
                                        }}
                                    >
                                        {isLogin ? 'Sign Up' : 'Sign In'}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
