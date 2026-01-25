import React, { useState } from 'react';
import { auth } from '../firebase';
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { motion } from 'framer-motion';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');

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
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '1rem',
            background: 'linear-gradient(135deg, var(--bg-gradient-start), var(--bg-gradient-end))'
        }}>

            <motion.div
                className="glass-card"
                initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ type: "spring", duration: 0.8 }}
                style={{
                    width: '100%',
                    maxWidth: '420px',
                    padding: '2.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backdropFilter: 'blur(20px)'
                }}
            >
                <h1 className="mb-4">Taskflow</h1>
                <p className="mb-4" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                    {isLogin ? 'Welcome back! Sign in to continue.' : 'Create an account to get started.'}
                </p>

                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleGoogleLogin}
                        className="btn"
                        style={{
                            background: 'white',
                            color: '#333',
                            width: '100%',
                            display: 'flex',
                            gap: '10px',
                            border: 'none',
                            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                        }}
                    >
                        <span style={{ fontWeight: 'bold', color: '#4285F4' }}>G</span>
                        Sign in with Google
                    </motion.button>

                    <div style={{ display: 'flex', alignItems: 'center', margin: '0.5rem 0' }}>
                        <div style={{ height: '1px', background: 'var(--glass-border)', flex: 1 }}></div>
                        <span style={{ padding: '0 0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>OR</span>
                        <div style={{ height: '1px', background: 'var(--glass-border)', flex: 1 }}></div>
                    </div>

                    <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <motion.input
                            whileFocus={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            type="email"
                            placeholder="Email"
                            className="task-input"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)' }}
                        />
                        <motion.input
                            whileFocus={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            type="password"
                            placeholder="Password"
                            className="task-input"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            style={{ background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)' }}
                        />

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                style={{ color: '#ef4444', fontSize: '0.875rem', textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '0.5rem', borderRadius: '8px' }}
                            >
                                {error}
                            </motion.div>
                        )}

                        <motion.button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '0.5rem' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {isLogin ? 'Log In' : 'Sign Up'}
                        </motion.button>
                    </form>

                    <button
                        onClick={() => { setError(''); setIsLogin(!isLogin); }}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--primary)',
                            cursor: 'pointer',
                            marginTop: '1rem',
                            textAlign: 'center',
                            fontSize: '0.9rem',
                            textDecoration: 'underline',
                            opacity: 0.8
                        }}
                    >
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
