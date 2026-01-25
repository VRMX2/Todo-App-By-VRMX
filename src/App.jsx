import { useState, useEffect } from 'react'
import { Sun, Moon, CheckSquare, LogOut } from 'lucide-react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import {
    collection,
    query,
    where,
    onSnapshot,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp,
    orderBy
} from 'firebase/firestore';
import Dashboard from './components/Dashboard';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Auth from './components/Auth';
import './index.css'

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);

    // Theme State
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Firestore Task Listener
    useEffect(() => {
        if (!user) {
            setTasks([]);
            return;
        }

        const q = query(
            collection(db, 'tasks'),
            where('uid', '==', user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tasksData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            // Sort by createdAt descending (newest first)
            tasksData.sort((a, b) => {
                const dateA = a.createdAt?.seconds || 0;
                const dateB = b.createdAt?.seconds || 0;
                return dateB - dateA;
            });
            setTasks(tasksData);
        });

        return () => unsubscribe();
    }, [user]);

    const addTask = async (text, category) => {
        if (!user) {
            console.error('No user logged in');
            return;
        }
        try {
            console.log('Adding task:', { text, category, uid: user.uid });
            await addDoc(collection(db, 'tasks'), {
                text,
                description: '',
                category,
                completed: false,
                status: 'pending',
                priority: 'medium',
                dueDate: null,
                uid: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            console.log('Task added successfully');
        } catch (error) {
            console.error('Error adding task:', error);
            alert('Failed to add task: ' + error.message);
        }
    };

    const updateTask = async (id, updates) => {
        try {
            await updateDoc(doc(db, 'tasks', id), {
                ...updates,
                updatedAt: serverTimestamp()
            });
            console.log('Task updated successfully');
        } catch (error) {
            console.error('Error updating task:', error);
            alert('Failed to update task: ' + error.message);
        }
    };

    const toggleTask = async (id) => {
        const task = tasks.find(t => t.id === id);
        if (!task) return;
        await updateDoc(doc(db, 'tasks', id), {
            completed: !task.completed
        });
    };

    const deleteTask = async (id) => {
        await deleteDoc(doc(db, 'tasks', id));
    };

    const handleSignOut = () => {
        signOut(auth);
    };

    // Date formatting
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
    }

    if (!user) {
        return <Auth />;
    }

    return (
        <div className="app-container">
            <header className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div style={{ background: '#ea580c', padding: '6px', borderRadius: '8px', color: 'white', display: 'flex' }}>
                        <CheckSquare size={24} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Taskflow</h2>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Welcome, {user.email}</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="btn"
                        style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-muted)' }}
                        aria-label="Toggle theme"
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <button
                        onClick={handleSignOut}
                        className="btn"
                        style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-muted)' }}
                        aria-label="Sign out"
                        title="Sign Out"
                    >
                        <LogOut size={20} />
                    </button>

                    <div style={{ color: '#6b7280' }}>{dateStr}</div>
                </div>
            </header>

            <section className="mb-4">
                <h1>Good morning, what will you accomplish today?</h1>
                <p className="subtitle">You have {tasks.filter(t => !t.completed).length} active tasks remaining</p>
            </section>

            <Dashboard tasks={tasks} />

            <TaskInput onAdd={addTask} />

            <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
            />

            <footer style={{ textAlign: 'center', marginTop: '4rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                Built with simplicity in mind
            </footer>
        </div>
    )
}

export default App
