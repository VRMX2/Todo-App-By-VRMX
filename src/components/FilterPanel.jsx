import React from 'react';
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
    const categories = ['All', 'Work', 'Study', 'Personal', 'Health'];
    const priorities = ['All', 'Low', 'Medium', 'High'];
    const statuses = ['All', 'Pending', 'In Progress', 'Completed'];
    const sortOptions = [
        { value: 'createdAt-desc', label: 'Newest First' },
        { value: 'createdAt-asc', label: 'Oldest First' },
        { value: 'dueDate-asc', label: 'Due Date (Earliest)' },
        { value: 'dueDate-desc', label: 'Due Date (Latest)' },
        { value: 'priority-desc', label: 'Priority (High to Low)' },
        { value: 'priority-asc', label: 'Priority (Low to High)' }
    ];

    return (
        <div className="filter-panel">
            <div className="filter-header">
                <SlidersHorizontal size={18} />
                <span>Filters & Sorting</span>
            </div>

            <div className="filter-grid">
                <div className="filter-group">
                    <label className="filter-label">Category</label>
                    <select
                        value={selectedCategory}
                        onChange={(e) => onCategoryChange(e.target.value)}
                        className="filter-select"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Priority</label>
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
                                {pri}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Status</label>
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
                                {status}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="filter-label">
                        <ArrowUpDown size={14} /> Sort By
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
