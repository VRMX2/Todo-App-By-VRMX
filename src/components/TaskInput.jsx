import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function TaskInput({ onAdd }) {
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Work');
    const [priority, setPriority] = useState('Medium');
    const [recurrence, setRecurrence] = useState('none');
    const [dueDate, setDueDate] = useState(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim()) {
            onAdd(text, category, description, priority, dueDate, recurrence);
            setText('');
            setDescription('');
            setCategory('Work');
            setPriority('Medium');
            setDueDate(null);
            setRecurrence('none');
            setIsExpanded(false);
        }
    };

    return (
        <form
            className={`glass-card mb-8 task-input-form ${isExpanded ? 'expanded' : ''}`}
            onSubmit={handleSubmit}
        >
            <div className="input-header">
                <div className="icon-badge">
                    <Plus size={24} />
                </div>
                <input
                    type="text"
                    className="main-input"
                    placeholder="What needs to be done?"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onFocus={() => setIsExpanded(true)}
                />
                {!isExpanded && (
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={!text.trim()}
                    >
                        Add
                    </button>
                )}
            </div>

            <div className={`input-details ${isExpanded ? 'show' : ''}`}>
                <textarea
                    className="description-input"
                    placeholder="Add a description (optional)"
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="input-grid">
                    <div className="input-field">
                        <label>Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Work">Work</option>
                            <option value="Study">Study</option>
                            <option value="Personal">Personal</option>
                            <option value="Health">Health</option>
                        </select>
                    </div>

                    <div className="input-field">
                        <label>Priority</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>

                    <div className="input-field">
                        <label>Due Date</label>
                        <DatePicker
                            selected={dueDate}
                            onChange={(date) => setDueDate(date)}
                            placeholderText="Select date"
                            dateFormat="MMM d"
                            minDate={new Date()}
                        />
                    </div>

                    <div className="input-field">
                        <label>Repeat</label>
                        <select
                            value={recurrence}
                            onChange={(e) => setRecurrence(e.target.value)}
                        >
                            <option value="none">No Repeat</option>
                            <option value="daily">Daily</option>
                            <option value="weekly">Weekly</option>
                            <option value="monthly">Monthly</option>
                        </select>
                    </div>
                </div>

                <div className="input-actions">
                    <button
                        type="button"
                        onClick={() => setIsExpanded(false)}
                        className="btn-text"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        <Plus size={18} style={{ marginRight: '0.5rem' }} />
                        Add Task
                    </button>
                </div>
            </div>
        </form>
    );
}
