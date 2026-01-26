import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);

        // Update direction
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
    };

    return (
        <button
            onClick={toggleLanguage}
            className="btn"
            style={{ padding: '0.5rem', background: 'transparent', color: 'var(--text-muted)' }}
            aria-label="Switch Language"
            title={i18n.language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
        >
            <Globe size={20} />
            <span style={{ marginLeft: '0.5rem', fontSize: '0.875rem' }}>
                {i18n.language === 'en' ? 'AR' : 'EN'}
            </span>
        </button>
    );
}
