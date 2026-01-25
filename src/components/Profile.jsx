import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { User, Mail, Lock, Camera, Save, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile({ user, onClose }) {
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setEmail(user.email || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        setError('');

        try {
            if (displayName !== user.displayName || photoURL !== user.photoURL) {
                await updateProfile(auth.currentUser, {
                    displayName,
                    photoURL
                });
            }

            if (email !== user.email) {
                await updateEmail(auth.currentUser, email);
            }

            if (newPassword) {
                await updatePassword(auth.currentUser, newPassword);
            }

            setMessage('Profile updated successfully!');
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (err) {
            console.error(err);
            setError(err.message.replace('Firebase: ', ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
        >
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                className="modal-card profile-modal"
            >
                <div className="modal-header">
                    <h2>Edit Profile</h2>
                    <button onClick={onClose} className="btn-icon close-btn">
                        <X size={24} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="profile-avatar-section">
                        <div className="profile-avatar-wrapper">
                            <div className="profile-avatar">
                                {photoURL ? (
                                    <img src={photoURL} alt="Profile" />
                                ) : (
                                    <User size={48} className="placeholder-icon" />
                                )}
                            </div>
                            <div className="avatar-edit-badge">
                                <Camera size={16} />
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleUpdateProfile} className="profile-form">
                        <div className="form-group">
                            <label>
                                <User size={16} /> Display Name
                            </label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="modal-input"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <Camera size={16} /> Photo URL
                            </label>
                            <input
                                type="text"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="modal-input"
                                placeholder="Paste image URL..."
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <Mail size={16} /> Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="modal-input"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <Lock size={16} /> New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="modal-input"
                                placeholder="Leave blank to keep current"
                            />
                        </div>

                        {error && (
                            <div className="alert error">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="alert success">
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary full-width"
                        >
                            {loading ? 'Saving...' : (
                                <>
                                    <Save size={18} style={{ marginRight: '0.5rem' }} /> Save Changes
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
}
