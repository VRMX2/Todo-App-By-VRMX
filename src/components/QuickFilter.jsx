import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Calendar, CheckCircle, List } from 'lucide-react';

export default function QuickFilter({ searchQuery, onSearchChange, activeFilter, onFilterChange }) {
    const { t } = useTranslation();

    const filters = [
        { id: 'all', label: t('quick_filter_all'), icon: List },
        { id: 'today', label: t('quick_filter_today'), icon: Calendar },
        { id: 'week', label: t('quick_filter_week'), icon: Calendar },
        { id: 'completed', label: t('quick_filter_completed'), icon: CheckCircle }
    ];

    return (
        <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
            {/* Search Bar */}
            <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
                <Search
                    size={20}
                    style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)'
                    }}
                />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder={t('search_placeholder')}
                    style={{
                        width: '100%',
                        padding: '0.75rem 1rem 0.75rem 3rem',
                        border: '1px solid var(--glass-border)',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'var(--text-main)',
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--primary)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'var(--glass-border)';
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    }}
                />
            </div>

            {/* Quick Filters */}
            <div className="filter-tabs" style={{ gap: '0.75rem' }}>
                {filters.map(filter => {
                    const Icon = filter.icon;
                    return (
                        <button
                            key={filter.id}
                            className={`filter-tab ${activeFilter === filter.id ? 'active' : ''}`}
                            onClick={() => onFilterChange(filter.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            <Icon size={16} />
                            {filter.label}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
