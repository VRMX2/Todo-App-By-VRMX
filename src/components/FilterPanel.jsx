import React from 'react';
import { useTranslation } from 'react-i18next';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export default function FilterPanel({
    selectedCategory,
    onCategoryChange,
    selectedPriority,
    onPriorityChange,
    selectedStatus,
    onStatusChange,
    sortBy,
    onSortChange
}) {
    const { t } = useTranslation();
    const categories = ['All', 'Work', 'Study', 'Personal', 'Health'];
    const priorities = ['All', 'Low', 'Medium', 'High'];
    const statuses = ['All', 'Pending', 'In Progress', 'Completed'];
    const sortOptions = [
        { value: 'createdAt-desc', label: t('sort_newest_first') },
        { value: 'createdAt-asc', label: t('sort_oldest_first') },
        { value: 'dueDate-asc', label: t('sort_due_date_earliest') },
        { value: 'dueDate-desc', label: t('sort_due_date_latest') },
        { value: 'priority-desc', label: t('sort_priority_high') },
        { value: 'priority-asc', label: t('sort_priority_low') }
    ];

    const getCategoryLabel = (cat) => {
        const map = {
            'All': t('cat_all'),
            'Work': t('cat_work_filter'),
            'Study': t('cat_study_filter'),
            'Personal': t('cat_personal_filter'),
            'Health': t('cat_health_filter')
        };
        return map[cat] || cat;
    };

    const getStatusLabel = (status) => {
        const map = {
            'All': t('filter_all'),
            'Pending': t('filter_pending'),
            'In Progress': t('filter_in_progress'),
            'Completed': t('filter_completed')
        };
        return map[status] || status;
    };

    const getPriorityLabel = (pri) => {
        const map = {
            'All': t('filter_all'),
            'Low': t('priority_low'),
            'Medium': t('priority_medium'),
            'High': t('priority_high')
        };
        return map[pri] || pri;
    };

    return (
        <div className="filter-panel">
            <div className="filter-header">
                <SlidersHorizontal size={18} />
                <span>{t('filter_title')}</span>
            </div>

            <div className="filter-grid">
                <div className="filter-group">
                    <label className="filter-label">{t('category_label')}</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="filter-select"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{getCategoryLabel(cat)}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">{t('priority_label')}</label>
                    <select
                        value={selectedPriority}
                        onChange={(e) => onPriorityChange(e.target.value)}
                        className="filter-select"
                    >
                        {priorities.map(pri => (
                            <option key={pri} value={pri}>
                                {pri === 'Low' && '🟢 '}
                                {pri === 'Medium' && '🟡 '}
                                {pri === 'High' && '🔴 '}
                                {getPriorityLabel(pri)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">{t('filter_status_label')}</label>
                    <select
                        value={selectedStatus}
                        onChange={(e) => onStatusChange(e.target.value)}
                        className="filter-select"
                    >
                        {statuses.map(status => (
                            <option key={status} value={status}>
                                {status === 'Pending' && '🕒 '}
                                {status === 'In Progress' && '🔄 '}
                                {status === 'Completed' && '✅ '}
                                {getStatusLabel(status)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">
                        <ArrowUpDown size={14} /> {t('sort_by')}
                    </label>
                    <select
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="filter-select"
                    >
                        {sortOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
