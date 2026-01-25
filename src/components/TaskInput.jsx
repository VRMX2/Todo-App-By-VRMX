import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TaskInput({ onAdd }) {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('Personal');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text, category);
            setText('');
            // Keep last category or reset? Let's keep it user preference, or reset. Resetting might be cleaner.
            // setCategory('Personal'); 
        }
    };

    return (
        <form className="input-group" onSubmit={handleSubmit}>
            <input
                type="text"
                className="task-input"
                placeholder="Add a new task..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="task-input"
                style={{ flex: '0 0 auto', width: '140px', cursor: 'pointer' }}
            >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
            </select>
            <button type="submit" className="btn btn-primary">
                <Plus size={18} style={{ marginRight: '0.5rem' }} />
                Add Task
            </button>
        </form>
    );
}
