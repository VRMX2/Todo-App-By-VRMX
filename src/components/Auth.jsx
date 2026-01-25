import React, { useState } from 'react';
import { auth } from '../firebase';
import {
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { Mail, Component } from 'lucide-react'; // 'Component' as placeholder for google logo if not available, or just text

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
            height: '100vh',
            maxWidth: '400px',
            margin: '0 auto',
            padding: '1rem'
        }}>
            <h1 className="mb-4">Taskflow</h1>
            <p className="mb-4 text-muted">Sign in to manage your tasks</p>

            <div className="stat-card" style={{ width: '100%', gap: '1rem' }}>
                <button
                    onClick={handleGoogleLogin}
                    className="btn"
                    style={{
                        background: 'white',
                        border: '1px solid #ddd',
                        color: '#333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        justifyContent: 'center',
                        width: '100%'
                    }}
                >
                    {/* Simple Google G simulation */}
                    <span style={{ fontWeight: 'bold', color: '#4285F4' }}>G</span>
                    Sign in with Google
                </button>

                <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
                    <div style={{ height: '1px', background: 'var(--border-color)', flex: 1 }}></div>
                    <span style={{ padding: '0 0.5rem', color: 'var(--text-muted)' }}>OR</span>
                    <div style={{ height: '1px', background: 'var(--border-color)', flex: 1 }}></div>
                </div>

                <form onSubmit={handleEmailAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="task-input"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="task-input"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    {error && <p style={{ color: 'red', fontSize: '0.875rem' }}>{error}</p>}

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                <button
                    onClick={() => setIsLogin(!isLogin)}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary)',
                        cursor: 'pointer',
                        marginTop: '0.5rem',
                        textAlign: 'center',
                        fontSize: '0.875rem'
                    }}
                >
                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                </button>
            </div>
        </div>
    );
}
