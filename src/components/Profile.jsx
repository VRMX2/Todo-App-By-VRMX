import React, { useState, useEffect, useRef } from 'react';
import { auth } from '../firebase';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { User, Mail, Lock, Camera, Save, X, Upload } from 'lucide-react';
import { motion } from 'framer-motion';

const CLOUDINARY_CLOUD_NAME = 'dmck7lqxj';
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';

export default function Profile({ user, onClose }) {
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const cameraInputRef = useRef(null);

    useEffect(() => {
        if (user) {
            setDisplayName(user.displayName || '');
            setEmail(user.email || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]);

    const handleFileUpload = async (file) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select an image file');
            return;
        }

        if (file.size > 10 * 1024 * 1024) {
            setError('Image size should be less than 10MB');
            return;
        }

        setUploading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
            formData.append('folder', 'profile_photos');

            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const data = await response.json();
            setPhotoURL(data.secure_url);
            setMessage('Photo uploaded successfully!');
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            console.error('Upload error:', err);
            setError('Failed to upload photo. Please try again.');
        } finally {
            setUploading(false);
        }
    };

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
            }, 1500);
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
            onClick={onClose}
        >
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                className="modal-card"
                onClick={(e) => e.stopPropagation()}
                style={{ maxWidth: '500px', width: '90%' }}
            >
                {/* Header */}
                <div style={{
                    padding: '1.5rem',
                    borderBottom: '1px solid var(--glass-border)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Edit Profile</h2>
                    <button onClick={onClose} className="btn-icon" style={{ background: 'transparent' }}>
                        <X size={24} />
                    </button>
                </div>

                <div style={{ padding: '2rem' }}>
                    {/* Avatar Section */}
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            position: 'relative',
                            width: '120px',
                            height: '120px',
                            margin: '0 auto 1.5rem',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '4px solid var(--primary)',
                            boxShadow: '0 8px 24px rgba(249, 115, 22, 0.2)'
                        }}>
                            {photoURL ? (
                                <img
                                    src={photoURL}
                                    alt="Profile"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            ) : (
                                <div style={{
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'var(--glass-bg)',
                                    color: 'var(--text-muted)'
                                }}>
                                    <User size={48} />
                                </div>
                            )}
                            {uploading && (
                                <div style={{
                                    position: 'absolute',
                                    inset: 0,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'rgba(0,0,0,0.7)',
                                    color: 'white',
                                    fontSize: '0.875rem',
                                    fontWeight: '600'
                                }}>
                                    Uploading...
                                </div>
                            )}
                        </div>

                        {/* Upload Buttons */}
                        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="btn"
                                style={{
                                    fontSize: '0.875rem',
                                    padding: '0.625rem 1.25rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--glass-border)'
                                }}
                                disabled={uploading}
                            >
                                <Upload size={16} />
                                Upload
                            </button>
                            <button
                                type="button"
                                onClick={() => cameraInputRef.current?.click()}
                                className="btn"
                                style={{
                                    fontSize: '0.875rem',
                                    padding: '0.625rem 1.25rem',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'var(--glass-bg)',
                                    border: '1px solid var(--glass-border)'
                                }}
                                disabled={uploading}
                            >
                                <Camera size={16} />
                                Camera
                            </button>
                        </div>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                        />
                        <input
                            ref={cameraInputRef}
                            type="file"
                            accept="image/*"
                            capture="environment"
                            style={{ display: 'none' }}
                            onChange={(e) => handleFileUpload(e.target.files[0])}
                        />
                    </div>

                    {/* Form */}
                    <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: 'var(--text-main)'
                            }}>
                                <User size={16} /> Display Name
                            </label>
                            <input
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    color: 'var(--text-main)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: 'var(--text-main)'
                            }}>
                                <Mail size={16} /> Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    color: 'var(--text-main)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.5rem',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: 'var(--text-main)'
                            }}>
                                <Lock size={16} /> New Password
                            </label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    border: '1px solid var(--glass-border)',
                                    borderRadius: 'var(--radius-md)',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    color: 'var(--text-main)',
                                    fontSize: '1rem',
                                    outline: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                                placeholder="Leave blank to keep current"
                            />
                        </div>

                        {error && (
                            <div style={{
                                padding: '0.75rem 1rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                borderRadius: 'var(--radius-md)',
                                color: '#ef4444',
                                fontSize: '0.875rem'
                            }}>
                                {error}
                            </div>
                        )}

                        {message && (
                            <div style={{
                                padding: '0.75rem 1rem',
                                background: 'rgba(16, 185, 129, 0.1)',
                                border: '1px solid rgba(16, 185, 129, 0.3)',
                                borderRadius: 'var(--radius-md)',
                                color: '#10b981',
                                fontSize: '0.875rem'
                            }}>
                                {message}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || uploading}
                            className="btn btn-primary"
                            style={{
                                width: '100%',
                                padding: '0.875rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                        >
                            {loading ? 'Saving...' : (
                                <>
                                    <Save size={18} /> Save Changes
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </motion.div>
    );
}
