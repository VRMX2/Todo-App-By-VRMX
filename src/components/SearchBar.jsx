import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, X } from 'lucide-react';

export default function SearchBar({ searchQuery, onSearchChange }) {
    const { t } = useTranslation();
    return (
        <div className="search-bar">
            <Search size={20} className="search-icon" />
            <input
                type="text"
                className="search-input"
                placeholder={t('search_placeholder_long')}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchQuery && (
                <button
                    className="search-clear"
                    onClick={() => onSearchChange('')}
                    aria-label={t('search_clear')}
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}
