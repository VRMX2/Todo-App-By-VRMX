import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import './i18n';
import { Sun, Moon, CheckSquare, LogOut, User as UserIcon, History } from 'lucide-react';
import { addDays, addWeeks, addMonths } from 'date-fns';
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
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import Profile from './components/Profile';
import HistoryView from './components/HistoryView';
import LanguageSwitcher from './components/LanguageSwitcher';
import './index.css'

function App() {
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [showProfile, setShowProfile] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    // Search and Filter State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedPriority, setSelectedPriority] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [sortBy, setSortBy] = useState('createdAt-desc');

    // Theme State
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'light';
        }
        return 'light';
    });

    useEffect(() => {
        const root = window.document.documentElement;
        // Clean up any potential conflicts
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const requestNotificationPermission = async () => {
        if ('Notification' in window) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                new Notification("Notifications Enabled", {
                    body: "You will now be notified of upcoming tasks!",
                    icon: '/vite.svg'
                });
            }
        }
    };

    // Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        // Request Notification Permission
        if ('Notification' in window && Notification.permission !== 'granted') {
            Notification.requestPermission();
        }

        return () => unsubscribe();
    }, []);

    // Set direction based on language on mount/update
    useEffect(() => {
        document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = i18n.language;
    }, [i18n.language]);

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

    // Notification Logic
    useEffect(() => {
        const checkDueTasks = () => {
            if (!('Notification' in window) || Notification.permission !== 'granted') return;

            const now = new Date();
            tasks.forEach(task => {
                if (!task.dueDate || task.status === 'completed' || task.notified) return;

                const dueDate = task.dueDate.toDate ? task.dueDate.toDate() : new Date(task.dueDate);
                const timeDiff = dueDate.getTime() - now.getTime();

                // Notify if due within 30 minutes and not yet overdue by more than 1 minute (to avoid spamming on load)
                if (timeDiff > 0 && timeDiff <= 30 * 60 * 1000) {
                    new Notification(`Task Due Soon: ${task.text}`, {
                        body: `This task is due in ${Math.round(timeDiff / 60000)} minutes.`,
                        icon: '/vite.svg' // Placeholder icon
                    });

                    // Mark as notified in local state (or ideally in Firestore to prevent cross-device spam)
                    // For now, to keep it simple without excessive writes, we'll just guard against repeated notifications 
                    // in this session by relying on the rough time window check, or we could update Firestore.
                    // Let's update Firestore to be safe.
                    updateDoc(doc(db, 'tasks', task.id), { notified: true });
                }
            });
        };

        const interval = setInterval(checkDueTasks, 60000); // Check every minute
        // Also run once on load/tasks change
        checkDueTasks();

        return () => clearInterval(interval);
    }, [tasks]);

    const addTask = async (text, category, description, priority, dueDate, recurrence) => {
        if (!user) {
            console.error('No user logged in');
            return;
        }
        try {
            await addDoc(collection(db, 'tasks'), {
                text,
                description: description || '',
                category,
                completed: false,
                status: 'pending',
                priority: priority ? priority.toLowerCase() : 'medium',
                dueDate: dueDate ? dueDate : null,
                recurrence: recurrence || 'none',
                uid: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
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

        const newCompleted = !task.completed;
        await updateDoc(doc(db, 'tasks', id), {
            completed: newCompleted,
            status: newCompleted ? 'completed' : 'in-progress' // Auto-update status text too
        });

        // Handle Recurrence
        if (newCompleted && task.recurrence && task.recurrence !== 'none') {
            const nextDueDate = task.dueDate ? (task.dueDate.toDate ? task.dueDate.toDate() : new Date(task.dueDate)) : new Date();
            let newDate = null;

            if (task.recurrence === 'daily') newDate = addDays(nextDueDate, 1);
            else if (task.recurrence === 'weekly') newDate = addWeeks(nextDueDate, 1);
            else if (task.recurrence === 'monthly') newDate = addMonths(nextDueDate, 1);

            if (newDate) {
                await addDoc(collection(db, 'tasks'), {
                    ...task,
                    id: undefined, // Remove ID to create new
                    completed: false,
                    status: 'pending',
                    dueDate: newDate,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                    notified: false // Reset notification
                });
                console.log('Recurring task created');
            }
        }
    };

    const deleteTask = async (id) => {
        // Soft delete
        try {
            await updateDoc(doc(db, 'tasks', id), {
                status: 'deleted',
                deletedAt: serverTimestamp(),
                completed: true // Treat as completed for some logic, or just use status
            });
            console.log('Task soft deleted');
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('Failed to delete task: ' + error.message);
        }
    };

    const restoreTask = async (id) => {
        try {
            await updateDoc(doc(db, 'tasks', id), {
                status: 'pending',
                completed: false,
                deletedAt: null
            });
            console.log('Task restored');
        } catch (error) {
            console.error('Error restoring task:', error);
        }
    };

    const permanentDeleteTask = async (id) => {
        try {
            await deleteDoc(doc(db, 'tasks', id));
            console.log('Task permanently deleted');
        } catch (error) {
            console.error('Error deleting task permanently:', error);
        }
    };

    // Filter and Sort Tasks
    const getFilteredAndSortedTasks = () => {
        let filtered = tasks.filter(t => t.status !== 'deleted'); // Exclude deleted tasks from main view

        // Search filter
        if (searchQuery) {
            filtered = filtered.filter(task =>
                task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Category filter
        if (selectedCategory !== 'All') {
            filtered = filtered.filter(task => task.category === selectedCategory);
        }

        // Priority filter
        if (selectedPriority !== 'All') {
            filtered = filtered.filter(task => task.priority === selectedPriority.toLowerCase());
        }

        // Status filter
        if (selectedStatus !== 'All') {
            const statusMap = {
                'Pending': 'pending',
                'In Progress': 'in-progress',
                'Completed': 'completed'
            };
            filtered = filtered.filter(task => task.status === statusMap[selectedStatus]);
        }

        // Sorting
        const [sortField, sortOrder] = sortBy.split('-');
        filtered.sort((a, b) => {
            let aValue, bValue;

            if (sortField === 'createdAt') {
                aValue = a.createdAt?.seconds || 0;
                bValue = b.createdAt?.seconds || 0;
            } else if (sortField === 'dueDate') {
                aValue = a.dueDate?.seconds || 999999999999;
                bValue = b.dueDate?.seconds || 999999999999;
            } else if (sortField === 'priority') {
                const priorityOrder = { high: 3, medium: 2, low: 1 };
                aValue = priorityOrder[a.priority] || 2;
                bValue = priorityOrder[b.priority] || 2;
            }

            return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        });

        return filtered;
    };

    const filteredTasks = getFilteredAndSortedTasks();

    const handleSignOut = () => {
        signOut(auth);
    };

    // Date formatting
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    const showNotificationBtn = 'Notification' in window && Notification.permission === 'default';

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
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>{t('app_title')}</h2>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                            {t('welcome', { name: user.displayName || user.email.split('@')[0] })}
                        </span>
                    </div>
                    {showNotificationBtn && (
                        <button
                            onClick={requestNotificationPermission}
                            className="btn"
                            style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', marginLeft: '1rem', background: 'rgba(249, 115, 22, 0.1)', color: 'var(--primary)' }}
                        >
                            {t('enable_alerts')}
                        </button>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    <LanguageSwitcher />
                    <button
                        onClick={() => setShowHistory(true)}
                        className="btn"
                        style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-muted)' }}
                        title={t('history_title')}
                    >
                        <History size={20} />
                    </button>
                    <button
                        onClick={() => setShowProfile(true)}
                        className="btn"
                        style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-muted)' }}
                        title="Edit Profile"
                    >
                        {user.photoURL ? (
                            <img src={user.photoURL} alt="Profile" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            <UserIcon size={20} />
                        )}
                    </button>
                    <button
                        onClick={toggleTheme}
                        className="btn"
                        style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-muted)' }}
                        aria-label={t('theme_toggle')}
                    >
                        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                    </button>

                    <button
                        onClick={handleSignOut}
                        className="btn"
                        style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-muted)' }}
                        aria-label="Sign out"
                        title={t('sign_out')}
                    >
                        <LogOut size={20} />
                    </button>

                    <div style={{ color: '#6b7280' }}>{dateStr}</div>
                </div>
            </header>

            {showProfile && (
                <Profile user={user} onClose={() => setShowProfile(false)} />
            )}

            <section className="mb-4">
                <h1>{t('good_morning')}</h1>
                <p className="subtitle">{t('active_tasks_count', { count: tasks.filter(t => !t.completed).length })}</p>
            </section>

            {showHistory ? (
                <HistoryView
                    tasks={tasks}
                    onRestore={restoreTask}
                    onDeleteForever={permanentDeleteTask}
                    onBack={() => setShowHistory(false)}
                />
            ) : (
                <>
                    <Dashboard tasks={tasks.filter(t => t.status !== 'deleted')} />

                    <TaskInput onAdd={addTask} />

                    <TaskList
                        tasks={filteredTasks}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onUpdate={updateTask}
                    />
                </>
            )}

            <footer style={{ textAlign: 'center', marginTop: '4rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                {t('footer_text')}
            </footer>
        </div>
    )
}

export default App
