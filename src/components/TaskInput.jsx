import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function TaskInput({ onAdd }) {
    const { t } = useTranslation();
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
                    placeholder={t('add_task_placeholder')}
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
                        {t('add_btn')}
                    </button>
                )}
            </div>

            <div className={`input-details ${isExpanded ? 'show' : ''}`}>
                <textarea
                    className="description-input"
                    placeholder={t('description')}
                    rows="2"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="input-grid">
                    <div className="input-field">
                        <label>{t('category_label')}</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="Work">{t('cat_work')}</option>
                            <option value="Study">{t('cat_study')}</option>
                            <option value="Personal">{t('cat_personal')}</option>
                            <option value="Health">{t('cat_health')}</option>
                        </select>
                    </div>

                    <div className="input-field">
                        <label>{t('priority_label')}</label>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                        >
                            <option value="Low">{t('priority_low')}</option>
                            <option value="Medium">{t('priority_medium')}</option>
                            <option value="High">{t('priority_high')}</option>
                        </select>
                    </div>

                    <div className="input-field">
                        <label>{t('due_date_label')}</label>
                        <DatePicker
                            selected={dueDate}
                            onChange={(date) => setDueDate(date)}
                            placeholderText={t('due_date')}
                            dateFormat="MMM d"
                            minDate={new Date()}
                        />
                    </div>

                    <div className="input-field">
                        <label>{t('repeat_label')}</label>
                        <select
                            value={recurrence}
                            onChange={(e) => setRecurrence(e.target.value)}
                        >
                            <option value="none">{t('no_repeat')}</option>
                            <option value="daily">{t('recurring_daily')}</option>
                            <option value="weekly">{t('recurring_weekly')}</option>
                            <option value="monthly">{t('recurring_monthly')}</option>
                        </select>
                    </div>
                </div>

                <div className="input-actions">
                    <button
                        type="button"
                        onClick={() => setIsExpanded(false)}
                        className="btn-text"
                    >
                        {t('cancel')}
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        <Plus size={18} style={{ marginRight: '0.5rem' }} />
                        {t('add_btn')}
                    </button>
                </div>
            </div>
        </form>
    );
}
