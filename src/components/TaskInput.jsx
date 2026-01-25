import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function TaskInput({ onAdd }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text);
            setText('');
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
            <button type="submit" className="btn btn-primary">
                <Plus size={18} style={{ marginRight: '0.5rem' }} />
                Add Task
            </button>
        </form>
    );
}
