import { useState, useEffect } from 'react'
import { Sun, Moon, CheckSquare } from 'lucide-react';
import Dashboard from './components/Dashboard';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './index.css'

function App() {
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

    const [tasks, setTasks] = useState([
        { id: 1, text: 'Review project proposal', category: 'Work', completed: false },
        { id: 2, text: 'Schedule team meeting', category: 'Work', completed: true },
        { id: 3, text: 'Buy groceries', category: 'Personal', completed: false },
        { id: 4, text: 'Complete design mockups', category: 'Work', completed: false },
        { id: 5, text: 'Call mom', category: 'Personal', completed: true },
    ]);

    const addTask = (text, category) => {
        const newTask = {
            id: Date.now(),
            text,
            category,
            completed: false,
        };
        setTasks([newTask, ...tasks]);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(t =>
            t.id === id ? { ...t, completed: !t.completed } : t
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(t => t.id !== id));
    };

    // Date formatting
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    return (
        <div className="app-container">
            <header className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    <div style={{ background: '#ea580c', padding: '6px', borderRadius: '8px', color: 'white', display: 'flex' }}>
                        <CheckSquare size={24} />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Taskflow</h2>
                        <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Stay organized</span>
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
            />

            <footer style={{ textAlign: 'center', marginTop: '4rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                Built with simplicity in mind
            </footer>
        </div>
    )
}

export default App
